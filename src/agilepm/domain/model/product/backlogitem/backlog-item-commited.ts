import { DomainEvent } from 'src/common/domain/model';
import { TenantId } from '../../tenant/tenant-id';
import { SprintId } from '../sprint/sprint-id';
import { BacklogItemId } from './backlog-item-id';

export class BacklogItemCommitted implements DomainEvent {
  private _backlogItemId: BacklogItemId;
  private _committedSprintId: SprintId;
  private _eventVersion: number;
  private _occurredOn: Date;
  private _tenantId: TenantId;

  constructor(
    aTenantId: TenantId,
    aBacklogItemId: BacklogItemId,
    aCommittedSprintId: SprintId,
  ) {
    this._backlogItemId = aBacklogItemId;
    this._committedSprintId = aCommittedSprintId;
    this._eventVersion = 1;
    this._occurredOn = new Date();
    this._tenantId = aTenantId;
  }

  get backlogItemId(): BacklogItemId {
    return this._backlogItemId;
  }

  get committedSprintId(): SprintId {
    return this._committedSprintId;
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
