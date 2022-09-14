import { DomainEvent } from 'src/common/domain/model';
import { TenantId } from './tenant-id';

export class GroupGroupRemoved implements DomainEvent {
  private _eventVersion: number;
  private _occurredOn: Date;
  private _groupName: string;
  private _nestedGroupName: string;
  private _tenantId: TenantId;

  constructor(tenantId: TenantId, groupName: string, nestedGroupName: string) {
    this._eventVersion = 1;
    this._occurredOn = new Date();
    this._tenantId = tenantId;
    this._groupName = groupName;
    this._nestedGroupName = nestedGroupName;
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

  nestedGroupName(): string {
    return this._nestedGroupName;
  }

  tenantId(): TenantId {
    return this._tenantId;
  }
}
