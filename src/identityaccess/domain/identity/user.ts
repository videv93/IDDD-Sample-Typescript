import { FullName } from './full-name';
import { ContactInformation } from './contact-information';
import { UserPasswordChanged } from './user-password-changed';
import { Person } from './person';
import { TenantId } from './tenant-id';
import { Enablement } from './enablement';
import { ConcurrencySafeEntity } from 'src/common/domain/model/concurrency-safe-entity';
import { DomainEventPublisher } from 'src/common/domain/model/domain-event-publisher';
import { DomainRegistry } from '../domain-registry';
import { GroupMember } from './group-member';
import { GroupMemberType } from './group-member-type';
import { UserRegistered } from './user-registerd';
import { UserDescriptor } from './user-descriptor';
import { UserEnablementChanged } from './user-enablement-changed';

export class User extends ConcurrencySafeEntity {
  private _enablement: Enablement;
  private _password: string;
  private _person: Person;
  private _tenantId: TenantId;
  private _username: string;

  constructor(
    tenantId: TenantId,
    username: string,
    password: string,
    enablement: Enablement,
    person: Person,
  ) {
    super();
    this.setEnablement(enablement);
    this.setPerson(person);
    this.setTenantId(tenantId);
    this.setUsername(username);
    this.protectPassword('', password);
    person.internalOnlySetUser(this);

    DomainEventPublisher.instance().publish(
      new UserRegistered(
        this.tenantId(),
        username,
        person.name(),
        person.contactInformation().emailAddress(),
      ),
    );
  }

  setEnablement(enablement: Enablement) {
    this.assertArgumentNotNull(enablement, 'The enablement is required.');

    this._enablement = enablement;
  }

  setPerson(person: Person) {
    this.assertArgumentNotNull(person, 'The person is required.');
    this._person = person;
  }

  setTenantId(tenantId: TenantId) {
    this.assertArgumentNotNull(tenantId, 'TenantId is required.');

    this._tenantId = tenantId;
  }

  setUsername(username: string) {
    this.assertArgumentNotEmpty(username, 'The username is required.');
    this.assertArgumentLength(
      username,
      3,
      250,
      'The username must be 3 to 250 characters.',
    );
    this._username = username;
  }

  changePassword(currentPassword: string, changedPassword: string): void {
    this.assertArgumentNotEmpty(
      currentPassword,
      'Current and new password must be provided.',
    );
    this.assertArgumentEquals(
      this.password(),
      this.asEncryptedValue(currentPassword),
      'Current password not confirmed.',
    );
    this.protectPassword(currentPassword, changedPassword);

    DomainEventPublisher.instance().publish(
      new UserPasswordChanged(this.tenantId(), this.username()),
    );
  }

  changePersonalContactInformation(contactInformation: ContactInformation) {
    this.person().changeContactInformation(contactInformation);
  }

  changePersonalName(personalName: FullName) {
    this.person().changeName(personalName);
  }

  defineEnablement(enablement: Enablement) {
    this.setEnablement(enablement);

    DomainEventPublisher.instance().publish(
      new UserEnablementChanged(
        this.tenantId(),
        this.username(),
        this.enablement(),
      ),
    );
  }

  protected assertPasswordsNotSame(
    currentPassword: string,
    changedPassword: string,
  ) {
    this.assertArgumentNotEquals(
      currentPassword,
      changedPassword,
      'The password is unchanged',
    );
  }

  protected assertPasswordNotWeak(plainTextPassword: string) {
    this.assertArgumentFalse(
      DomainRegistry.passwordService().isWeak(plainTextPassword),
      'The password must be stronger.',
    );
  }

  protected protectPassword(
    currentPassword: string,
    changedPassword: string,
  ): void {
    this.assertPasswordsNotSame(currentPassword, changedPassword);
    this.setPassword(this.asEncryptedValue(changedPassword));
  }

  protected asEncryptedValue(plainTextPassword: string): string {
    const encryptedValue =
      DomainRegistry.encryptionService().encryptedValue(plainTextPassword);

    return encryptedValue;
  }

  isEnabled() {
    return this.enablement().isEnablementEnabled();
  }

  person() {
    return this._person;
  }

  password(): string {
    return this._password;
  }

  tenantId() {
    return this._tenantId;
  }

  username() {
    return this._username;
  }

  enablement() {
    return this._enablement;
  }

  private setPassword(password: string) {
    this._password = password;
  }

  userDescriptor(): UserDescriptor {
    return new UserDescriptor(
      this.tenantId(),
      this.username(),
      this.person().emailAddress().address(),
    );
  }

  toGroupMember(): GroupMember {
    let groupMember = new GroupMember(
      this.tenantId(),
      this.username(),
      GroupMemberType.USER,
    );
    return groupMember;
  }
}
