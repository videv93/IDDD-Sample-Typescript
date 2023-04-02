import { DomainEvent } from 'src/common/domain/model';
import { TenantId } from '../../tenant/tenant-id';
import { BacklogItemId } from './backlog-item-id';

export class BacklogItemCategoryChanged implements DomainEvent {
  private _backlogItemId: BacklogItemId;
  private _category: string;
  private _eventVersion: number;
  private _occurredOn: Date;
  private _tenantId: TenantId;

  constructor(
    aTenantId: TenantId,
    aBacklogItemId: BacklogItemId,
    aCategory: string,
  ) {
    this._backlogItemId = aBacklogItemId;
    this._category = aCategory;
    this._eventVersion = 1;
    this._occurredOn = new Date();
    this._tenantId = aTenantId;
  }

  get backlogItemId(): BacklogItemId {
    return this._backlogItemId;
  }

  get category(): string {
    return this._category;
  }

  get tenantId(): TenantId {
    return this._tenantId;
  }

  eventVersion() {
    return this._eventVersion;
  }

  occurredOn() {
    return this._occurredOn;
  }
}
