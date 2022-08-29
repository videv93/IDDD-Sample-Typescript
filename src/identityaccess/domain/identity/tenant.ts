import { ConcurrencySafeEntity } from 'src/common/domain/model/concurrency-safe-entity';
import { DomainEventPublisher } from 'src/common/domain/model/domain-event-publisher';
import { Enablement } from './enablement';
import { Person } from './person';
import { RegistrationInvitation } from './registration-invitation';
import { TenantActivated } from './tenant-activated';
import { TenantDeactivated } from './tenant-deactivated';
import { TenantId } from './tenant-id';
import { User } from './user';

export class Tenant extends ConcurrencySafeEntity {
  private _active: boolean;
  private _description: string;
  private _name: string;
  private _registrationInvitations: Set<RegistrationInvitation>;
  private _tenantId: TenantId;

  constructor(
    tenantId: TenantId,
    name: string,
    description: string,
    active: boolean,
  ) {
    super();
    this.setActive(active);
    this.setDescription(description);
    this.setName(name);
    this.setTenantId(tenantId);
  }

  activate() {
    if (!this.isActive()) {
      this.setActive(true);
      DomainEventPublisher.instance().publish(
        new TenantActivated(this.tenantId()),
      );
    }
  }

  deactivate() {
    if (this.isActive()) {
      this.setActive(false);
      DomainEventPublisher.instance().publish(
        new TenantDeactivated(this.tenantId()),
      );
    }
  }

  tenantId() {
    return this._tenantId;
  }

  description() {
    return this._description;
  }

  isActive() {
    return this._active;
  }

  name() {
    return this._name;
  }

  registrationInvitations() {
    return this._registrationInvitations;
  }

  protected setActive(active: boolean) {
    this._active = active;
  }

  invitation(invitationIdentifier: string) {
    for (let invitation of this.registrationInvitations()) {
      if (invitation.isIdentifiedBy(invitationIdentifier)) {
        return invitation;
      }
    }
    return null;
  }

  isRegistrationAvailableThrough(invitationIdentifier: string) {
    this.assertStateTrue(this.isActive(), 'Tenant is not active.');
    let invitation = this.invitation(invitationIdentifier);
    return invitation == null ? false : invitation.isAvailable();
  }

  registerUser(
    invitationIdentifier: string,
    username: string,
    password: string,
    enablement: Enablement,
    person: Person,
  ): User {
    this.assertStateTrue(this.isActive(), 'Tennant is not active.');

    let user = null;
    if (this.isRegistrationAvailableThrough(invitationIdentifier)) {
      person.setTenantId(this.tenantId());
      user = new User(this.tenantId(), username, password, enablement, person);
    }
    return user;
  }

  protected setDescription(description: string) {
    this.assertArgumentNotEmpty(
      description,
      'The tenant description is required',
    );
    this.assertArgumentLength(
      description,
      1,
      100,
      'The tenant description must be 100 characters or less.',
    );

    this._description = description;
  }

  protected setName(name: string) {
    this.assertArgumentNotEmpty(name, 'The tenant name is required');
    this.assertArgumentLength(
      name,
      1,
      100,
      'The name must be 100 characters or less.',
    );

    this._name = name;
  }

  protected setRegistrationInvitations(
    registrationInvitations: Set<RegistrationInvitation>,
  ) {
    this._registrationInvitations = registrationInvitations;
  }

  protected setTenantId(tenantId: TenantId) {
    this.assertArgumentNotNull(tenantId, 'TenantId is required');
    this._tenantId = tenantId;
  }
}
