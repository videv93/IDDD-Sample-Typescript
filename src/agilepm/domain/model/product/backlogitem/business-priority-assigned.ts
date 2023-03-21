import { DomainEvent } from 'src/common/domain/model';
import { TenantId } from '../../tenant/tenant-id';
import { BacklogItemId } from './backlog-item-id';
import { BusinessPriority } from './business-priority';

export class BusinessPriorityAssigned implements DomainEvent {
  private _backlogItemId: BacklogItemId;
  private _businessPriority: BusinessPriority;
  private _eventVersion: number;
  private _occurredOn: Date;
  private _tenantId: TenantId;

  constructor(
    tenantId: TenantId,
    backlogItemId: BacklogItemId,
    businessPriority: BusinessPriority,
  ) {
    this._tenantId = tenantId;
    this._backlogItemId = backlogItemId;
    this._eventVersion = 1;
    this._occurredOn = new Date();
    this._businessPriority = businessPriority;
  }

  eventVersion() {
    return this._eventVersion;
  }

  occurredOn() {
    return this._occurredOn;
  }

  get backlogItemId() {
    return this._backlogItemId;
  }

  get businessPriority() {
    return this._businessPriority;
  }

  get tenantId() {
    return this._tenantId;
  }
}
