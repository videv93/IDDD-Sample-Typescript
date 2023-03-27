import { DomainEventPublisher } from 'src/common/domain/model/domain-event-publisher';
import { Entity } from 'src/common/domain/model/entity';
import { IllegalArgumentException } from 'src/common/illegal-argument.exception';
import { DiscussionDescriptor } from '../dicussion/dicusion-descriptor';
import {
  isRequested,
  isReady,
  DiscussionAvailability,
} from '../dicussion/discussion-availability';
import { ProductOwner } from '../team/product-owner';
import { ProductOwnerId } from '../team/product-owner-id';
import { TenantId } from '../tenant/tenant-id';
import { BacklogItemId } from './backlogitem/backlog-item-id';
import { BacklogItem } from './backlogitem/backlog-item';
import { BacklogItemStatus } from './backlogitem/backlog-item-status';
import { BacklogItemType } from './backlogitem/backlog-item-type';
import { StoryPoints } from './backlogitem/story-point';
import { ProductBacklogItem } from './product-backlog-item';
import { ProductCreated } from './product-created';
import { ProductDiscussion } from './product-discussion';
import { ProductDiscussionInitiated } from './product-discussion-initiated';
import { ProductId } from './product-id';
import { ProductBacklogItemPlanned } from './product-backlog-item-planned';
import { ProductDiscussionRequested } from './backlogitem/backlog-item-discussion-requested';
import { Release } from './release/release';
import { ReleaseId } from './release/release-id';
import { ProductReleaseScheduled } from './product-release-schedulted';

export class Product extends Entity {
  private _backlogItems: Set<ProductBacklogItem>;
  private _description: string;
  private _discussion: ProductDiscussion;
  private _discussionInitiationId: string;
  private _name: string;
  private _productId: ProductId;
  private _productOwnerId: ProductOwnerId;
  private _tenantId: TenantId;

  constructor(
    tenantId: TenantId,
    productId: ProductId,
    productOwnerId: ProductOwnerId,
    name: string,
    description: string,
    discussionAvailability: DiscussionAvailability,
  ) {
    super();
    this.tenantId = tenantId;
    this.description = description;
    this.discussion = ProductDiscussion.fromAvailability(
      discussionAvailability,
    );
    this.discussionInitiationId = null;
    this.name = name;
    this.productId = productId;
    this.productOwnerId = productOwnerId;

    DomainEventPublisher.instance().publish(
      new ProductCreated(
        this.tenantId,
        this.productId,
        this.productOwnerId,
        this.name,
        this.description,
        isRequested(this.discussion.availability),
      ),
    );
  }

  failDiscussionInitiation() {
    if (!isReady(this.discussion.availability)) {
      this.discussionInitiationId = null;
      this.discussion = ProductDiscussion.fromAvailability(
        DiscussionAvailability.FAILED,
      );
    }
  }

  initiateDiscussion(descriptor: DiscussionDescriptor) {
    if (descriptor == null) {
      throw new IllegalArgumentException('The descriptor must not be null.');
    }

    if (isRequested(this.discussion.availability)) {
      this.discussion = this.discussion.nowReady(descriptor);
      DomainEventPublisher.instance().publish(
        new ProductDiscussionInitiated(
          this.tenantId,
          this.productId,
          this.discussion,
        ),
      );
    }
  }

  planBacklogItem(
    backlogItemId: BacklogItemId,
    summary: string,
    category: string,
    type: BacklogItemType,
    storyPoints: StoryPoints,
  ) {
    const backlogItem = new BacklogItem(
      this.tenantId,
      this.productId,
      backlogItemId,
      summary,
      category,
      type,
      BacklogItemStatus.PLANNED,
      storyPoints,
    );

    DomainEventPublisher.instance().publish(
      new ProductBacklogItemPlanned(
        backlogItem.tenantId,
        backlogItem.productId,
        backlogItem.backlogItemId,
        backlogItem.summary,
        backlogItem.category,
        backlogItem.type,
        backlogItem.storyPoints,
      ),
    );
  }

  plannedProductBacklogItem(backlogItem: BacklogItem) {
    this.assertArgumentEquals(
      this.tenantId,
      backlogItem.tenantId,
      'The product and backlog item must have same tenant.',
    );
    this.assertArgumentEquals(
      this.productId,
      backlogItem.productId,
      'The backlog item must belong to product.',
    );

    const ordering = this.backlogItems.size + 1;

    const productBacklogItem = new ProductBacklogItem(
      this.tenantId,
      this.productId,
      backlogItem.backlogItemId,
      ordering,
    );

    this.backlogItems.add(productBacklogItem);
  }

  requestDiscussion(discussionAvailability: DiscussionAvailability) {
    if (isReady(this.discussion.availability)) {
      this.discussion = ProductDiscussion.fromAvailability(
        discussionAvailability,
      );
      DomainEventPublisher.instance().publish(
        new ProductDiscussionRequested(
          this.tenantId,
          this.productId,
          this.productOwnerId,
          this.name,
          this.description,
          isRequested(this.discussion.availability),
        ),
      );
    }
  }

  scheduleRelease(
    releaseId: ReleaseId,
    name: string,
    description: string,
    begins: Date,
    ends: Date,
  ) {
    const release = new Release(
      this.tenantId,
      this.productId,
      releaseId,
      name,
      description,
      begins,
      ends,
    );
    DomainEventPublisher.instance().publish(
      new ProductReleaseScheduled(
        release.tenantId,
        release.productId,
        release.releaseId,
        release.name,
        description,
        release.begins,
        release.ends,
      ),
    );
    return release;
  }

  changeProductOwner(productOwner: ProductOwner) {
    if (this.productOwnerId != productOwner.productOwnerId) {
      this.productOwnerId = productOwner.productOwnerId;
    }
  }

  set name(name: string) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set tenantId(tenantId: TenantId) {
    this._tenantId = tenantId;
  }

  get tenantId() {
    return this._tenantId;
  }

  set productId(productId: ProductId) {
    this._productId = productId;
  }

  get productId() {
    return this._productId;
  }

  set description(description: string) {
    this._description = description;
  }

  get description() {
    return this._description;
  }

  set discussion(discussion: ProductDiscussion) {
    this._discussion = discussion;
  }

  get discussion() {
    return this._discussion;
  }

  set discussionInitiationId(discussionInitiationId: string) {
    this._discussionInitiationId = discussionInitiationId;
  }

  get discussionInitiationId() {
    return this._discussionInitiationId;
  }

  set productOwnerId(productOwnerId: ProductOwnerId) {
    this._productOwnerId = productOwnerId;
  }

  get productOwnerId() {
    return this._productOwnerId;
  }

  get backlogItems() {
    return this._backlogItems;
  }
}
