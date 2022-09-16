import { DomainEventPublisher } from 'src/common/domain/model/domain-event-publisher';
import { IllegalArgumentException } from 'src/common/illegal-argument.exception';
import { RoleRepository } from '../access/role.repository';
import { DomainRegistry } from '../domain-registry';
import { EmailAddress } from './email-address';
import { Enablement } from './enablement';
import { FullName } from './full-name';
import { Person } from './person';
import { ContactInformation } from './contact-information';
import { PostalAddress } from './postal-address';
import { TelePhone } from './telephone';
import { Tenant } from './tenant';
import { TenantRepository } from './tenant.repository';
import { UserRepository } from './user.repository';
import { TenantAdministratorRegistered } from './tenant-administrator-registered';
import { TenantProvisioned } from './tenant-provisioned';

export class TenantProvisioningService {
  private _roleRepository: RoleRepository;
  private _tenantRepository: TenantRepository;
  private _userRepository: UserRepository;

  constructor(
    tenantRepository: TenantRepository,
    userRepository: UserRepository,
    roleRepository: RoleRepository,
  ) {
    this._roleRepository = roleRepository;
    this._tenantRepository = tenantRepository;
    this._userRepository = userRepository;
  }

  provisionTenant(
    tenantName: string,
    tenantDescription: string,
    administorName: FullName,
    emailAddress: EmailAddress,
    postalAddress: PostalAddress,
    primaryTelephone: TelePhone,
    secondaryTelephone: TelePhone,
  ) {
    try {
      let tenant = new Tenant(
        this.tenantRepository().nextIdentity(),
        tenantName,
        tenantDescription,
        true,
      );

      this.tenantRepository().add(tenant);
      this.registerAdministratorFor(
        tenant,
        administorName,
        emailAddress,
        postalAddress,
        primaryTelephone,
        secondaryTelephone,
      );

      DomainEventPublisher.instance().publish(
        new TenantProvisioned(tenant.tenantId()),
      );
      return tenant;
    } catch (error) {
      throw new IllegalArgumentException(
        'Cannot provision tenant because: ' + error.message,
      );
    }
  }

  registerAdministratorFor(
    tenant: Tenant,
    administorName: FullName,
    emailAddress: EmailAddress,
    postalAddress: PostalAddress,
    primaryTelephone: TelePhone,
    secondaryTelephone: TelePhone,
  ) {
    let invitation = tenant.offerRegistrationInvitation('init').openEnded();

    let strongPassword =
      DomainRegistry.passwordService().generateStrongPassword();

    let admin = tenant.registerUser(
      invitation.invitationId(),
      'admin',
      strongPassword,
      Enablement.indefiniteEnablement(),
      new Person(
        tenant.tenantId(),
        administorName,
        new ContactInformation(
          emailAddress,
          postalAddress,
          primaryTelephone,
          secondaryTelephone,
        ),
      ),
    );

    tenant.withdrawInvitation(invitation.invitationId());
    this.userRepository().add(admin);

    let adminRole = tenant.provisionRole(
      'Administrator',
      'Default ' + tenant.name() + ' administrator.',
    );

    adminRole.assignUser(admin);
    this.roleRepository().add(adminRole);

    DomainEventPublisher.instance().publish(
      new TenantAdministratorRegistered(
        tenant.tenantId(),
        tenant.name(),
        administorName,
        emailAddress,
        admin.username(),
        strongPassword,
      ),
    );
  }

  roleRepository() {
    return this._roleRepository;
  }

  tenantRepository() {
    return this._tenantRepository;
  }

  userRepository() {
    return this._userRepository;
  }
}
