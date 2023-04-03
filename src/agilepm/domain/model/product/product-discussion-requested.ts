import { DomainEvent } from 'src/common/domain/model';
import { ProductOwnerId } from '../team/product-owner-id';
import { TenantId } from '../tenant/tenant-id';
import { ProductId } from './product-id';

export class ProductDiscussionRequested implements DomainEvent {
  private _description: string;
  private _eventVersion: number;
  private _name: string;
  private _occurredOn: Date;
  private _productId: ProductId;
  private _productOwnerId: ProductOwnerId;
  private _requestingDiscussion: boolean;
  private _tenantId: TenantId;

  constructor(
    aTenantId: TenantId,
    aProductId: ProductId,
    aProductOwnerId: ProductOwnerId,
    aName: string,
    aDescription: string,
    isRequestingDiscussion: boolean,
  ) {
    this._description = aDescription;
    this._eventVersion = 1;
    this._name = aName;
    this._occurredOn = new Date();
    this._productId = aProductId;
    this._productOwnerId = aProductOwnerId;
    this._requestingDiscussion = isRequestingDiscussion;
    this._tenantId = aTenantId;
  }

  get requestDiscussion() {
    return this._requestingDiscussion;
  }

  get description() {
    return this._description;
  }

  get name() {
    return this._name;
  }

  get prodcutId() {
    return this._productId;
  }

  get productOwnerId() {
    return this._productOwnerId;
  }

  get tenantId() {
    return this._tenantId;
  }

  eventVersion() {
    return this._eventVersion;
  }

  occurredOn() {
    return this._occurredOn;
  }
}
