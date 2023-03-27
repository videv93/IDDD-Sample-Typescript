import { DomainEvent } from 'src/common/domain/model';
import { ProductOwnerId } from '../../team/product-owner-id';
import { TenantId } from '../../tenant/tenant-id';
import { ProductId } from '../product-id';

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
    tenantId: TenantId,
    productId: ProductId,
    productOwnerId: ProductOwnerId,
    name: string,
    description: string,
    requestingDiscussion: boolean,
  ) {
    this._tenantId = tenantId;
    this._productId = productId;
    this._productOwnerId = productOwnerId;
    this._name = name;
    this._description = description;
    this._requestingDiscussion = requestingDiscussion;
    this._eventVersion = 1;
    this._occurredOn = new Date();
  }

  eventVersion() {
    return this._eventVersion;
  }

  occurredOn() {
    return this._occurredOn;
  }
}
