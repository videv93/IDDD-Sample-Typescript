import { DomainEvent } from 'src/common/domain/model';
import { Enablement } from './enablement';
import { TenantId } from './tenant-id';

export class UserEnablementChanged implements DomainEvent {
  private _enablement: Enablement;
  private _eventVersion: number;
  private _occurredOn: Date;
  private _tenantId: TenantId;
  private _username: string;

  constructor(tenantId: TenantId, username: string, enablement: Enablement) {
    this._tenantId = tenantId;
    this._username = username;
    this._enablement = enablement;
  }

  occurredOn() {
    return this._occurredOn;
  }

  eventVersion() {
    return this._eventVersion;
  }

  enablement() {
    return this._enablement;
  }

  tenantId() {
    return this._tenantId;
  }

  username() {
    return this._username;
  }
}
