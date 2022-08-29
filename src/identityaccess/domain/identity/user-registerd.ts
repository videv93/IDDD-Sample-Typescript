import { DomainEvent } from 'src/common/domain/model';
import { EmailAddress } from './email-address';
import { FullName } from './full-name';
import { TenantId } from './tenant-id';

export class UserRegistered implements DomainEvent {
  private _emailAddress: EmailAddress;
  private _eventVersion: number;
  private _name: FullName;
  private _occurredOn: Date;
  private _tenantId: TenantId;
  private _username: string;

  constructor(
    tenantId: TenantId,
    username: string,
    name: FullName,
    emailAddress: EmailAddress,
  ) {
    this._emailAddress = emailAddress;
    this._eventVersion = 1;
    this._name = name;
    this._occurredOn = new Date();
    this._tenantId = tenantId;
    this._username = username;
  }

  emailAddress() {
    return this._emailAddress;
  }

  name() {
    return this._name;
  }

  tenantId() {
    return this._tenantId;
  }

  username() {
    return this._username;
  }

  eventVersion() {
    return this._eventVersion;
  }

  occurredOn() {
    return this._occurredOn;
  }
}
