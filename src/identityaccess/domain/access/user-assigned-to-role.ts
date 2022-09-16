import { DomainEvent } from 'src/common/domain/model';
import { TenantId } from '../identity/tenant-id';

export class UserAssignedToRole implements DomainEvent {
  private _emailAddress: string;
  private _eventVersion: number;
  private _firstName: string;
  private _lastName: string;
  private _occurredOn: Date;
  private _roleName: string;
  private _tenantId: TenantId;
  private _username: string;

  constructor(
    tenantId: TenantId,
    roleName: string,
    username: string,
    firstName: string,
    lastName: string,
    emailAddress: string,
  ) {
    this._emailAddress = emailAddress;
    this._eventVersion = 1;
    this._firstName = firstName;
    this._lastName = lastName;
    this._occurredOn = new Date();
    this._roleName = roleName;
    this._tenantId = tenantId;
    this._username = username;
  }

  eventVersion() {
    return this._eventVersion;
  }

  occurredOn() {
    return this._occurredOn;
  }

  emailAddress() {
    return this._emailAddress;
  }

  firstName(): string {
    return this._firstName;
  }

  lastName(): string {
    return this._lastName;
  }

  roleName() {
    return this._roleName;
  }

  tenantId(): TenantId {
    return this._tenantId;
  }

  username(): string {
    return this._username;
  }
}
