import { DomainEvent } from 'src/common/domain/model';
import { TenantId } from '../../tenant/tenant-id';
import { BacklogItemId } from './backlog-item-id';
import { BacklogItemType } from './backlog-item-type';

export class BacklogItemTypeChanged implements DomainEvent {
  private _backlogItemId: BacklogItemId;
  private _eventVersion: number;
  private _occurredOn: Date;
  private _tenantId: TenantId;
  private _type: BacklogItemType;

  constructor(
    tenantId: TenantId,
    backlogItemId: BacklogItemId,
    type: BacklogItemType,
  ) {
    this._backlogItemId = backlogItemId;
    this._eventVersion = 1;
    this._occurredOn = new Date();
    this._tenantId = tenantId;
    this._type = type;
  }

  get tenantId() {
    return this._tenantId;
  }

  get type() {
    return this._type;
  }

  get backlogItemId() {
    return this._backlogItemId;
  }

  eventVersion(): number {
    return this._eventVersion;
  }

  occurredOn(): Date {
    return this._occurredOn;
  }
}
