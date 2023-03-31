import { DiscussionDescriptor } from 'src/agilepm/domain/model/dicussion/dicusion-descriptor';
import { DiscussionAvailability } from 'src/agilepm/domain/model/dicussion/discussion-availability';
import { Product } from 'src/agilepm/domain/model/product/product';
import { ProductId } from 'src/agilepm/domain/model/product/product-id';
import { ProductRepository } from 'src/agilepm/domain/model/product/product.repository';
import { ProductOwnerId } from 'src/agilepm/domain/model/team/product-owner-id';
import { ProductOwnerRepository } from 'src/agilepm/domain/model/team/product-owner.repository';
import { TenantId } from 'src/agilepm/domain/model/tenant/tenant-id';
import { IllegalArgumentException } from 'src/common/illegal-argument.exception';
import { InitiateDiscussionCommand } from './initiate-discussion.command';
import { NewProductCommand } from './new-product.command';

export class ProductApplicationService {
  private _productOwnerRepository: ProductOwnerRepository;
  private _productRepository: ProductRepository;

  constructor(
    productOwnerRepository: ProductOwnerRepository,
    productRepository: ProductRepository,
  ) {
    this._productOwnerRepository = productOwnerRepository;
    this._productRepository = productRepository;
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

  get productOwnerRepository(): ProductOwnerRepository {
    return this._productOwnerRepository;
  }

  get productRepository(): ProductRepository {
    return this._productRepository;
  }
}
