import { DomainEvent } from 'src/common/domain/model';
import { TenantId } from '../tenant/tenant-id';
import { ProductId } from './product-id';
import { ReleaseId } from './release/release-id';

export class ProductReleaseScheduled implements DomainEvent {
  private _description: string;
  private _eventVersion: number;
  private _name: string;
  private _occurredOn: Date;
  private _productId: ProductId;
  private _releaseId: ReleaseId;
  private _requestingDiscussion: boolean;
  private _tenantId: TenantId;
  private _begins: Date;
  private _ends: Date;

  constructor(
    tenantId: TenantId,
    productId: ProductId,
    releaseId: ReleaseId,
    name: string,
    description: string,
    begins: Date,
    ends: Date,
  ) {
    this._tenantId = tenantId;
    this._productId = productId;
    this._releaseId = releaseId;
    this._name = name;
    this._description = description;
    this._begins = begins;
    this._ends = ends;
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
