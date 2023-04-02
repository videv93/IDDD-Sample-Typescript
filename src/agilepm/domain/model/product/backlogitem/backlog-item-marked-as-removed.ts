import { DomainEvent } from 'src/common/domain/model';
import { TenantId } from '../../tenant/tenant-id';
import { BacklogItemId } from './backlog-item-id';

export class BacklogItemMarkedAsRemoved implements DomainEvent {
  private _backlogItemId: BacklogItemId;
  private _eventVersion: number;
  private _occurredOn: Date;
  private _tenantId: TenantId;

  constructor(aTenantId: TenantId, aBacklogItemId: BacklogItemId) {
    this._backlogItemId = aBacklogItemId;
    this._eventVersion = 1;
    this._occurredOn = new Date();
    this._tenantId = aTenantId;
  }

  get backlogItemId() {
    return this._backlogItemId;
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
