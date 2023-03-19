import { Entity } from 'src/common/domain/model/entity';
import { DiscussionAvailability } from '../dicussion/discussion-availability';
import { ProductOwnerId } from '../team/product-owner-id';
import { TenantId } from '../tenant/tenant-id';
import { ProductBacklogItem } from './product-backlog-item';
import { ProductDiscussion } from './product-discussion';
import { ProductId } from './product-id';

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
  }

  set name(name: string) {
    this._name = name;
  }

  set tenantId(tenantId: TenantId) {
    this._tenantId = tenantId;
  }

  set productId(productId: ProductId) {
    this._productId = productId;
  }

  set description(description: string) {
    this._description = description;
  }

  set discussion(discussion: ProductDiscussion) {
    this._discussion = discussion;
  }

  set discussionInitiationId(discussionInitiationId: string) {
    this._discussionInitiationId = discussionInitiationId;
  }

  set productOwnerId(productOwnerId: ProductOwnerId) {
    this._productOwnerId = productOwnerId;
  }

  get backlogItems() {
    return this._backlogItems;
  }

  get name() {
    return this._name;
  }

  get tenantId() {
    return this._tenantId;
  }

  get productId() {
    return this._productId;
  }

  get description() {
    return this._description;
  }

  get discussion() {
    return this._discussion;
  }

  get discussionInitiationId() {
    return this._discussionInitiationId;
  }

  get productOwnerId() {
    return this._productOwnerId;
  }
}
