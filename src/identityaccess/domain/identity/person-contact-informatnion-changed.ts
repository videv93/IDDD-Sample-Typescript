import { TenantId } from './tenant-id';
import { ContactInformation } from './contact-information';
import { DomainEvent } from 'src/common/domain/model';

export class PersonContactInformationChanged implements DomainEvent {
  private _contactInformation: ContactInformation;
  private _eventVersion: number;
  private _occurredOn: Date;
  private _tenantId: TenantId;
  private _username: string;

  constructor(
    tenantId: TenantId,
    username: string,
    contactInformation: ContactInformation,
  ) {
    this._contactInformation = contactInformation;
    this._eventVersion = 1;
    this._occurredOn = new Date();
    this._tenantId = tenantId;
    this._username = username;
  }
  contactInformation() {
    return this._contactInformation;
  }
  eventVersion(): number {
    return this._eventVersion;
  }
  occurredOn(): Date {
    return this._occurredOn;
  }
  username(): string {
    return this._username;
  }
  tenantId(): TenantId {
    return this._tenantId;
  }
}
