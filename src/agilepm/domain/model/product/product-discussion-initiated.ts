import { DomainEvent } from 'src/common/domain/model';
import { TenantId } from '../tenant/tenant-id';
import { ProductDiscussion } from './product-discussion';
import { ProductId } from './product-id';

export class ProductDiscussionInitiated implements DomainEvent {
  private _eventVersion: number;
  private _occurredOn: Date;
  private _productDiscussion: ProductDiscussion;
  private _productId: ProductId;
  private _tenantId: TenantId;

  constructor(
    tenantId: TenantId,
    productId: ProductId,
    productDiscussion: ProductDiscussion,
  ) {
    this._eventVersion = 1;
    this._occurredOn = new Date();
    this._productDiscussion = productDiscussion;
    this._productId = productId;
    this._tenantId = tenantId;
  }

  occurredOn() {
    return this._occurredOn;
  }

  eventVersion() {
    return this._eventVersion;
  }
}
