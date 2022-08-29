import { DomainEvent } from 'src/common/domain/model';
import { TenantId } from './tenant-id';

export class TenantDeactivated implements DomainEvent {
  private _eventVersion: number;
  private _occurredOn: Date;
  private _tenantId: TenantId;

  constructor(tenantId: TenantId) {
    this._eventVersion = 1;
    this._occurredOn = new Date();
    this._tenantId = tenantId;
  }

  eventVersion() {
    return this._eventVersion;
  }

  occurredOn() {
    return this._occurredOn;
  }

  tenantId() {
    return this._tenantId;
  }
}
