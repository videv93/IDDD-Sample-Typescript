import { DomainEvent } from 'src/common/domain/model';
import { TenantId } from './tenant-id';

export class GroupGroupAdded implements DomainEvent {
  private _eventVersion: number;
  private _groupName: string;
  private _nestedGroupName: string;
  private _occurredOn: Date;
  private _tenantId: TenantId;

  constructor(tenantId: TenantId, groupName: string, nestedGroupName: string) {
    this._eventVersion = 1;
    this._groupName = groupName;
    this._nestedGroupName = nestedGroupName;
    this._occurredOn = new Date();
    this._tenantId = tenantId;
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

  nestedGroupName(): string {
    return this._nestedGroupName;
  }
}
