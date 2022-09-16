import { DomainEvent } from 'src/common/domain/model';
import { EmailAddress } from './email-address';
import { FullName } from './full-name';
import { TenantId } from './tenant-id';

export class TenantAdministratorRegistered implements DomainEvent {
  private _administratorName: FullName;
  private _emailAddress: EmailAddress;
  private _eventVersion: number;
  private _occurredOn: Date;
  private _temporaryPassword: string;
  private _tenantId: TenantId;
  private _tenantName: string;
  private _username: string;

  constructor(
    tenantId: TenantId,
    tenantName: string,
    administratorName: FullName,
    emailAddress: EmailAddress,
    username: string,
    temporaryPassword: string,
  ) {
    this._administratorName = administratorName;
    this._emailAddress = emailAddress;
    this._eventVersion = 1;
    this._occurredOn = new Date();
    this._temporaryPassword = temporaryPassword;
    this._tenantId = tenantId;
    this._tenantName = tenantName;
    this._username = username;
  }

  administratorName(): FullName {
    return this._administratorName;
  }

  emailAddress(): EmailAddress {
    return this._emailAddress;
  }

  eventVersion() {
    return this._eventVersion;
  }

  occurredOn() {
    return this._occurredOn;
  }

  temporaryPassword() {
    return this._temporaryPassword;
  }

  tenantId(): TenantId {
    return this._tenantId;
  }

  tenantName(): string {
    return this._tenantName;
  }

  username(): string {
    return this._username;
  }
}
