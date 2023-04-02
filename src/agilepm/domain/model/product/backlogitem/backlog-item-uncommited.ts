import { DomainEvent } from 'src/common/domain/model';
import { TenantId } from '../../tenant/tenant-id';
import { SprintId } from '../sprint/sprint-id';
import { BacklogItemId } from './backlog-item-id';

export class BacklogItemUncommitted implements DomainEvent {
  private _backlogItemId: BacklogItemId;
  private _eventVersion: number;
  private _occurredOn: Date;
  private _tenantId: TenantId;
  private _uncommittedFromSprintId: SprintId;

  constructor(
    tenantId: TenantId,
    backlogItemId: BacklogItemId,
    uncommittedFromSprintId: SprintId,
  ) {
    this._backlogItemId = backlogItemId;
    this._eventVersion = 1;
    this._occurredOn = new Date();
    this._tenantId = tenantId;
    this._uncommittedFromSprintId = uncommittedFromSprintId;
  }

  get tenantId() {
    return this._tenantId;
  }

  get uncommittedFromSprintId() {
    return this._uncommittedFromSprintId;
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
