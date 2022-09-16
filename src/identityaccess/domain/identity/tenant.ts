import { ConcurrencySafeEntity } from 'src/common/domain/model/concurrency-safe-entity';
import { DomainEventPublisher } from 'src/common/domain/model/domain-event-publisher';
import { Enablement } from './enablement';
import { Person } from './person';
import { RegistrationInvitation } from './registration-invitation';
import { TenantActivated } from './tenant-activated';
import { TenantDeactivated } from './tenant-deactivated';
import { TenantId } from './tenant-id';
import { User } from './user';
import UUID from 'uuid';
import { Group } from './group';
import { GroupProvisioned } from './group-provisioned';
import { Role } from '../access/role';
import { RoleProvisioned } from '../access/role-provisioned';
import { InvitationDescriptor } from './invitation-descriptor';

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

  registrationInvitations() {
    return this._registrationInvitations;
  }

  allAvailableRegistratonInvitations() {
    this.assertStateTrue(this.isActive(), 'Tenant is not active.');

    return this.allRegistrationInvitationsFor(true);
  }

  allUnavailableRegistrationInvitations() {
    this.assertStateTrue(this.isActive(), 'Tenant is not active.');

    return this.allRegistrationInvitationsFor(false);
  }

  deactivate() {
    if (this.isActive()) {
      this.setActive(false);
      DomainEventPublisher.instance().publish(
        new TenantDeactivated(this.tenantId()),
      );
    }
  }

  description() {
    return this._description;
  }

  isActive() {
    return this._active;
  }

  isRegistrationAvailableThrough(invitationIdentifier: string) {
    this.assertStateTrue(this.isActive(), 'Tenant is not active.');
    let invitation = this.invitation(invitationIdentifier);
    return invitation == null ? false : invitation.isAvailable();
  }

  name() {
    return this._name;
  }

  offerRegistrationInvitation(description: string) {
    this.assertStateTrue(this.isActive(), 'Tenant is not active.');

    this.assertStateFalse(
      this.isRegistrationAvailableThrough(description),
      'Invitation already exists.',
    );

    let invitation = new RegistrationInvitation(
      this.tenantId(),
      UUID.v4(),
      description,
    );
    let added = this.registrationInvitations().add(invitation);
    // this.assertStateTrue(added, 'The invitation should have been added.');

    return invitation;
  }

  provisionGroup(name: string, description: string): Group {
    this.assertStateTrue(this.isActive(), 'Tenant is not active.');

    let group = new Group(this.tenantId(), name, description);

    DomainEventPublisher.instance().publish(
      new GroupProvisioned(this.tenantId(), name),
    );

    return group;
  }

  provisionRole(name: string, description: string): Role {
    return this.provisionRole2(name, description, false);
  }

  provisionRole2(name: string, description: string, supportNesting: boolean) {
    this.assertStateTrue(this.isActive(), 'Tenant is not active.');

    let role = new Role(this.tenantId(), name, description, supportNesting);

    DomainEventPublisher.instance().publish(
      new RoleProvisioned(this.tenantId(), name),
    );

    return role;
  }

  redefineRegistrationInvitationAs(invitationIdentifier: string) {
    this.assertStateTrue(this.isActive(), 'Tenant is not active.');

    let invitation = this.invitation(invitationIdentifier);

    if (invitation !== null) {
      invitation.redefineAs().openEnded();
    }

    return invitation;
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

  tenantId() {
    return this._tenantId;
  }

  withdrawInvitation(invitationIdentifier: string): void {
    let invitation = this.invitation(invitationIdentifier);
    if (invitation !== null) {
      this.registrationInvitations().delete(invitation);
    }
  }

  protected setActive(active: boolean) {
    this._active = active;
  }

  protected allRegistrationInvitationsFor(
    isAvailable: boolean,
  ): Set<InvitationDescriptor> {
    let allInvitations = new Set<InvitationDescriptor>();
    for (let invitation of this.registrationInvitations()) {
      if (invitation.isAvailable() === isAvailable) {
        allInvitations.add(invitation.toDescriptor());
      }
    }
    return allInvitations;
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

  protected invitation(invitationIdentifier: string) {
    for (let invitation of this.registrationInvitations()) {
      if (invitation.isIdentifiedBy(invitationIdentifier)) {
        return invitation;
      }
    }
    return null;
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
