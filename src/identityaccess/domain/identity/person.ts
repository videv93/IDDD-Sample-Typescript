import { PersonNameChanged } from './person-name-changed';
import { PersonContactInformationChanged } from './person-contact-informatnion-changed';
import { EmailAddress } from './email-address';
import { DomainEventPublisher } from './../../../common/domain/model/domain-event-publisher';
import { FullName } from './full-name';
import { User } from './user';
import { TenantId } from './tenant-id';
import { ContactInformation } from './contact-information';
import { ConcurrencySafeEntity } from 'src/common/domain/model/concurrency-safe-entity';
export class Person extends ConcurrencySafeEntity {
  private _contactInformation: ContactInformation;
  private _name: FullName;
  private _tenantId: TenantId;
  private _user: User;

  constructor(
    tenantId: TenantId,
    name: FullName,
    contactInformation: ContactInformation,
  ) {
    super();
    this.setContactInformation(contactInformation);
    this.setName(name);
    this.setTenantId(tenantId);
  }

  changeContactInformation(contactInformation: ContactInformation) {
    this.setContactInformation(contactInformation);
    DomainEventPublisher.instance().publish(
      new PersonContactInformationChanged(
        this.tenantId(),
        this.user().username(),
        this.contactInformation(),
      ),
    );
  }

  changeName(name: FullName): void {
    this.setName(name);
    DomainEventPublisher.instance().publish(
      new PersonNameChanged(
        this.tenantId(),
        this.user().username(),
        this.name(),
      ),
    );
  }

  contactInformation(): ContactInformation {
    return this._contactInformation;
  }

  emailAddress(): EmailAddress {
    return this.contactInformation().emailAddress();
  }

  name(): FullName {
    return this._name;
  }

  protected setContactInformation(
    contactInformation: ContactInformation,
  ): void {
    this.assertArgumentNotNull(
      contactInformation,
      'The person contact information is required.',
    );
    this._contactInformation = contactInformation;
  }

  protected setName(name: FullName) {
    this.assertArgumentNotNull(name, 'The person name is required.');
    this._name = name;
  }

  protected tenantId(): TenantId {
    return this.tenantId;
  }

  protected setTenantId(tenantId: TenantId): void {
    this.assertArgumentNotNull(tenantId, 'The tenantId is required.');
    this._tenantId = tenantId;
  }

  protected user(): User {
    return this._user;
  }

  internalOnlySetUser(user: User) {
    this._user = user;
  }
}
