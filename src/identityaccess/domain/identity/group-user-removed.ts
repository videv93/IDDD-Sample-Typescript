import { DomainEvent } from 'src/common/domain/model';
import { TenantId } from './tenant-id';

export class GroupUserRemoved implements DomainEvent {
  private _eventVersion: number;
  private _occurredOn: Date;
  private _groupName: string;
  private _tenantId: TenantId;
  private _username: string;

  constructor(tenantId: TenantId, groupName: string, username: string) {
    this._eventVersion = 1;
    this._occurredOn = new Date();
    this._groupName = groupName;
    this._tenantId = tenantId;
    this._username = username;
  }

  eventVersion(): number {
    return this._eventVersion;
  }

  occurredOn(): Date {
    return this._occurredOn;
  }

  groupName(): string {
    return this._groupName;
  }

  tenantId(): TenantId {
    return this._tenantId;
  }

  username(): string {
    return this._username;
  }
}
