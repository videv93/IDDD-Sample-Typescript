import { DiscussionDescriptor } from 'src/agilepm/domain/model/dicussion/dicusion-descriptor';
import { DiscussionAvailability } from 'src/agilepm/domain/model/dicussion/discussion-availability';
import { ProductDiscussionRequestTimedOut } from 'src/agilepm/domain/model/product/produc-discussion-request-timeout';
import { Product } from 'src/agilepm/domain/model/product/product';
import { ProductId } from 'src/agilepm/domain/model/product/product-id';
import { ProductRepository } from 'src/agilepm/domain/model/product/product.repository';
import { ProductOwnerRepository } from 'src/agilepm/domain/model/team/product-owner.repository';
import { TenantId } from 'src/agilepm/domain/model/tenant/tenant-id';
import { ProcessId } from 'src/common/domain/model/process/process-id';
import { TimeConstrainedProcessTracker } from 'src/common/domain/model/process/time-constrained-process-tracker';
import { TimeConstrainedProcessTrackerRepository } from 'src/common/domain/model/process/time-constrainted-process-tracker.repository';
import { IllegalArgumentException } from 'src/common/illegal-argument.exception';
import { InitiateDiscussionCommand } from './initiate-discussion.command';
import { NewProductCommand } from './new-product.command';
import { RequestProductDiscussionCommand } from './request-product-discussion.command';
import { RetryProductDiscussionCommand } from './retry-product-discussion.command';
import { StartDiscussionInitiationCommand } from './start-discussion-initiation.command';
import { TimeOutProductdiscussionRequestCommand } from './timeout-product-discussion-request.command';

export class ProductApplicationService {
  private _productOwnerRepository: ProductOwnerRepository;
  private _productRepository: ProductRepository;
  private _processTrackerRepository: TimeConstrainedProcessTrackerRepository;

  constructor(
    productOwnerRepository: ProductOwnerRepository,
    productRepository: ProductRepository,
    processtrackerRepository: TimeConstrainedProcessTrackerRepository,
  ) {
    this._productOwnerRepository = productOwnerRepository;
    this._productRepository = productRepository;
    this._processTrackerRepository = processtrackerRepository;
  }

  initiateDiscussion(command: InitiateDiscussionCommand): void {
    const product = this.productRepository.productOfId(
      new TenantId(command.tenantId),
      new ProductId(command.productId),
    );

    if (product == null) {
      throw new IllegalArgumentException(
        'Unknown product with tenant id: ' +
          command.tenantId +
          ' and product id: ' +
          command.productId,
      );
    }
    product.initiateDiscussion(new DiscussionDescriptor(command.discussionId));
    this._productRepository.save(product);
  }

  newProduct(command: NewProductCommand) {
    return this.newProductWith(
      command.tenantId,
      command.productOwnerId,
      command.name,
      command.description,
      DiscussionAvailability.NOT_REQUESTED,
    );
  }

  newProductWithDiscussion(command: NewProductCommand) {
    return this.newProductWith(
      command.tenantId,
      command.productOwnerId,
      command.name,
      command.description,
      this.requestDiscussionIfAvailable(),
    );
  }

  newProductWith(
    aTenantId: string,
    productOwnerId: string,
    name: string,
    description: string,
    discussionAvailability: DiscussionAvailability,
  ) {
    const tenantId = new TenantId(aTenantId);
    const productId = this.productRepository.nextIdentity();

    const productOwner = this.productOwnerRepository.productOwnerOfIdentity(
      tenantId,
      productOwnerId,
    );

    if (productOwner == null) {
      throw new IllegalArgumentException(
        'Unknown product owner with tenant id: ' +
          tenantId +
          ' and product owner id: ' +
          productOwnerId,
      );
    }

    const product = new Product(
      tenantId,
      productId,
      productOwner.productOwnerId,
      name,
      description,
      discussionAvailability,
    );

    this.productRepository.save(product);
  }

  timeOutProductDiscussionRequest(
    command: TimeOutProductdiscussionRequestCommand,
  ) {
    try {
      const processId = ProcessId.existingProcessId(command.processId);
      const tenantId = new TenantId(command.tenantId);

      const product = this.productRepository.productOfDiscussionInitiationId(
        tenantId,
        processId.id(),
      );

      this.sendEmailForTimeOutProcess(product);

      product.failDiscussionInitiation();
      this.productRepository.save(product);
    } catch (error) {
      console.log(error);
    }
  }

  sendEmailForTimeOutProcess(product: Product) {
    // TODO: implement
  }

  requestProductDiscussion(command: RequestProductDiscussionCommand) {
    const product = this.productRepository().productOfId(
      new TenantId(command.tenantId),
      new ProductId(command.productId),
    );

    if (product == null) {
      throw new IllegalArgumentException(
        'Unknown product with tenant id: ' +
          command.tenantId +
          ' and product id: ' +
          command.productId,
      );
    }
    this.requestProductDiscussionFor(product);
  }

  requestProductDiscussionFor(product: Product) {
    product.requestDiscussion(this.requestDiscussionIfAvailable());

    this.productRepository.save(product);
  }

  requestDiscussionIfAvailable() {
    let availability = DiscussionAvailability.AD_ON_NOT_ENABLED;
    const enabled = true;
    if (enabled) {
      availability = DiscussionAvailability.REQUESTED;
    }
    return availability;
  }

  retryProductDiscussionRequest(command: RetryProductDiscussionCommand) {
    const processId = ProcessId.existingProcessId(command.processId);
    const product = this.productRepository.productOfDiscussionInitiationId(
      new TenantId(command.tenantId),
      processId.id(),
    );

    if (product == null) {
      throw new IllegalArgumentException(
        'Unknown product with tenant id: ' +
          command.tenantId +
          ' and discussion initiatino id: ' +
          processId.id(),
      );
    }

    this.requestProductDiscussionFor(product);
  }

  startDiscussionInitiation(command: StartDiscussionInitiationCommand) {
    try {
      const product = this.productRepository.productOfId(
        new TenantId(command.tenantId),
        new ProductId(command.productId),
      );
      if (product == null) {
        throw new IllegalArgumentException(
          'Unknown product with tenant id: ' +
            command.tenantId +
            ' and product id: ' +
            command.productId,
        );
      }

      const tracker = this.processTrackerOfProduct(product);
      this.processTrackerRepository.save(tracker);
      product.startDiscussionInitiation(tracker.processId());
      this.productRepository.save(product);
    } catch (error) {
      console.log(error);
    }
  }

  processTrackerOfProduct(product: Product) {
    let tracker = null;
    if (product.discussionInitiationId != null) {
      const processId = ProcessId.existingProcessId(
        product.discussionInitiationId,
      );
      tracker = this.processTrackerRepository.trackerOfProcessId(
        product.tenantId.id,
        processId.id(),
      );
    } else {
      const timedOutEventName = ProductDiscussionRequestTimedOut.name;
      tracker = new TimeConstrainedProcessTracker(
        product.tenantId.id,
        ProcessId.newProcessId(),
        'Create discussion for product: ' + product.name,
        new Date(),
        5 * 60 * 1000,
        3,
        timedOutEventName,
      );
    }
    return tracker;
  }

  get processTrackerRepository() {
    return this._processTrackerRepository;
  }

  get productOwnerRepository(): ProductOwnerRepository {
    return this._productOwnerRepository;
  }

  get productRepository(): ProductRepository {
    return this._productRepository;
  }
}
