import { TenantId } from './tenant-id';
import { DomainEvent } from 'src/common/domain/model';

export class UserPasswordChanged implements DomainEvent {
  private _eventVersion: number;
  private _occurredOn: Date;
  private _tenantId: TenantId;
  private _username: string;

  constructor(tenantId: TenantId, username: string) {
    this._eventVersion = 1;
    this._occurredOn = new Date();
    this._username = username;
    this._tenantId = tenantId;
  }

  eventVersion(): number {
    return this._eventVersion;
  }
  occurredOn(): Date {
    return this._occurredOn;
  }

  tenantId(): TenantId {
    return this._tenantId;
  }

  username(): string {
    return this._username;
  }
}
