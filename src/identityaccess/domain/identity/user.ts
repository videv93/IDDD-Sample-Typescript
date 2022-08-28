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

export class User extends ConcurrencySafeEntity {
  private _enablement: Enablement;
  private _password: string;
  private _person: Person;
  private _tenantId: TenantId;
  private _username: string;

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

  toGroupMember(): GroupMember {
    let groupMember = new GroupMember(
      this.tenantId(),
      this.username(),
      GroupMemberType.USER,
    );
    return groupMember;
  }
}
