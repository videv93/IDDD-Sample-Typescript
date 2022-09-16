import { DomainEvent } from 'src/common/domain/model';
import { TenantId } from '../identity/tenant-id';

export class GroupAssignedToRole implements DomainEvent {
  private _eventVersion: number;
  private _groupName: string;
  private _occurredOn: Date;
  private _roleName: string;
  private _tenantId: TenantId;

  constructor(tenantId: TenantId, roleName: string, groupName: string) {
    this._eventVersion = 1;
    this._groupName = groupName;
    this._occurredOn = new Date();
    this._roleName = roleName;
    this._tenantId = tenantId;
  }

  eventVersion() {
    return this._eventVersion;
  }

  occurredOn() {
    return this._occurredOn;
  }

  groupName() {
    return this._groupName;
  }

  roleName() {
    return this._roleName;
  }

  tenantId() {
    return this._tenantId;
  }
}
