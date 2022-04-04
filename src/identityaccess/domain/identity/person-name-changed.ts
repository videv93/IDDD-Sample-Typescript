import { TenantId } from './tenant-id';
import { DomainEvent } from 'src/common/domain/model';
import { FullName } from './full-name';

export class PersonNameChanged implements DomainEvent {
  private _eventVersion: number;
  private _name: FullName;
  private _occurredOn: Date;
  private _tenantId: TenantId;
  private _username: string;

  constructor(tenantId: TenantId, username: string, name: FullName) {
    this._eventVersion = 1;
    this._name = name;
    this._occurredOn = this._occurredOn;
    this._tenantId = tenantId;
    this._username = username;
  }

  eventVersion(): number {
    return this._eventVersion;
  }
  occurredOn(): Date {
    return this._occurredOn;
  }
  name(): FullName {
    return this.name;
  }
  tenantId(): TenantId {
    return this._tenantId;
  }
  username(): string {
    return this._username;
  }
}
