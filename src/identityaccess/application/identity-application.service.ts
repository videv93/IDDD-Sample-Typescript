import { IllegalArgumentException } from 'src/common/illegal-argument.exception';
import { AuthenticationService } from '../domain/identity/authentication.service';
import { ContactInformation } from '../domain/identity/contact-information';
import { EmailAddress } from '../domain/identity/email-address';
import { Enablement } from '../domain/identity/enablement';
import { FullName } from '../domain/identity/full-name';
import { GroupMemberService } from '../domain/identity/group-member.service';
import { GroupRepository } from '../domain/identity/group.repository';
import { PostalAddress } from '../domain/identity/postal-address';
import { TelePhone } from '../domain/identity/telephone';
import { TenantId } from '../domain/identity/tenant-id';
import { TenantProvisioningService } from '../domain/identity/tenant-provising.service';
import { TenantRepository } from '../domain/identity/tenant.repository';
import { User } from '../domain/identity/user';
import { UserRepository } from '../domain/identity/user.repository';
import { ActivateTenantComand } from './command/activate-tenant.command';
import { AddGroupToGroupCommand } from './command/add-group-to-group.command';
import { AddUserToGroupCommand } from './command/add-user-to-group.command';
import { AuthenticateUserCommand } from './command/authenticate-user.command';
import { ChangeContactInfoCommand } from './command/change-contact-info.command';
import { ChangeEmailAddressCommand } from './command/change-email-address.command';
import { ChangePostalAddressCommand } from './command/change-postal-address.command';
import { ChangePrimaryTelephoneCommand } from './command/change-primary-telephone.command';
import { ChangeSecondaryTelephoneCommand } from './command/change-secondary-telephone.command';
import { ChangeUserPasswordCommand } from './command/change-user-password.command';
import { ChangeUserPersonalNameCommand } from './command/change-user-personal-name.comand';
import { DeactivateTenantCommand } from './command/deactive-tenant.command';
import { DefineUserEnablementCommand } from './command/define-user-enablement.command';

export class IdentityApplicationService {
  private _authenticationService: AuthenticationService;
  private _groupMemberService: GroupMemberService;
  private _groupRepository: GroupRepository;
  private _tenantPrivisioningService: TenantProvisioningService;
  private _tenantRepository: TenantRepository;
  private _userRepository: UserRepository;

  activeTenant(command: ActivateTenantComand) {
    let tenant = this.existingTenant(command.getTenantId());
    tenant.activate();
  }

  addGroupToGroup(command: AddGroupToGroupCommand) {
    let parentGroup = this.existingGroup(
      command.getTenantId(),
      command.getParentGroupName(),
    );
    let childGroup = this.existingGroup(
      command.getTenantId(),
      command.getChildGroupName(),
    );
    parentGroup.addGroup(childGroup, this.groupMemberService());
  }

  addUserToGroup(command: AddUserToGroupCommand) {
    let group = this.existingGroup(
      command.getTenantId(),
      command.getGroupName(),
    );

    let user = this.existingUser(command.getTenantId(), command.getUsername());
    group.addUser(user);
  }

  authenticateUser(command: AuthenticateUserCommand) {
    let userDescriptor = this.authenticationService().authenticate(
      new TenantId(command.getTenantId()),
      command.getUsername(),
      command.getPassword(),
    );

    return userDescriptor;
  }

  deactiveTenant(command: DeactivateTenantCommand) {
    let tenant = this.existingTenant(command.tenantId);

    tenant.deactivate();
  }

  changeUserContactInformation(command: ChangeContactInfoCommand) {
    let user = this.existingUser(command.tenantId, command.username);

    this.internalChangeUserContactInformation(
      user,
      new ContactInformation(
        new EmailAddress(command.emailAddress),
        new PostalAddress(
          command.addressStreetAddress,
          command.addressCity,
          command.addressStateProvince,
          command.addressPostalCode,
          command.addressCountryCode,
        ),
        new TelePhone(command.primaryTelephone),
        new TelePhone(command.secondaryTelephone),
      ),
    );
  }

  changeUserEmailAddress(command: ChangeEmailAddressCommand) {
    let user = this.existingUser(command.tenantId, command.username);
    this.internalChangeUserContactInformation(
      user,
      user
        .person()
        .contactInformation()
        .changeEmailAddress(new EmailAddress(command.emailAddress)),
    );
  }

  changeUserPostalAddress(command: ChangePostalAddressCommand) {
    let user = this.existingUser(command.tenantId, command.username);
    this.internalChangeUserContactInformation(
      user,
      user
        .person()
        .contactInformation()
        .changePostalAddress(
          new PostalAddress(
            command.addressStreetAddress,
            command.addressCity,
            command.addressStateProvince,
            command.addressPostalCode,
            command.addressCountryCode,
          ),
        ),
    );
  }

  changeUserPrimaryTelephone(command: ChangePrimaryTelephoneCommand) {
    let user = this.existingUser(command.tenantId, command.username);
    this.internalChangeUserContactInformation(
      user,
      user
        .person()
        .contactInformation()
        .changePrimaryTelephone(new TelePhone(command.telephone)),
    );
  }

  changeUserSecondaryTelephone(command: ChangeSecondaryTelephoneCommand) {
    let user = this.existingUser(command.tenantId, command.username);

    this.internalChangeUserContactInformation(
      user,
      user
        .person()
        .contactInformation()
        .changeSecondaryTelephone(new TelePhone(command.telephone)),
    );
  }

  changeUserPassword(command: ChangeUserPasswordCommand) {
    let user = this.existingUser(command.tenantId, command.username);

    user.changePassword(command.currentPassword, command.changedPassword);
  }

  changeUserPersonalName(command: ChangeUserPersonalNameCommand) {
    let user = this.existingUser(command.tenantId, command.username);

    user.person().changeName(new FullName(command.firstName, command.lastName));
  }

  definedUserEnablement(command: DefineUserEnablementCommand) {
    let user = this.existingUser(command.tenantId, command.username);

    user.defineEnablement(
      new Enablement(command.isEnabled, command.startDate, command.endDate),
    );
  }

  private internalChangeUserContactInformation(
    user: User,
    contactInformation: ContactInformation,
  ) {
    if (user === null) {
      throw new IllegalArgumentException('User must exist.');
    }

    user.person().changeContactInformation(contactInformation);
  }

  private existingTenant(tenantId: string) {
    let tenant = this.tenant(tenantId);
    if (tenant === null) {
      throw new IllegalArgumentException(
        'Tenant does not exist for: ' + tenantId,
      );
    }
    return tenant;
  }

  private existingGroup(tenantId: string, groupName: string) {
    let group = this.group(tenantId, groupName);

    if (group === null) {
      throw new IllegalArgumentException(
        'Group does not exist for: ' + tenantId + ' and: ' + groupName,
      );
    }

    return group;
  }

  private existingUser(tenantId: string, username: string) {
    let user = this.user(tenantId, username);

    if (user === null) {
      throw new IllegalArgumentException(
        'User does not exist for: ' + tenantId + ' and ' + username,
      );
    }

    return user;
  }

  user(tenantId: string, username: string) {
    let user = this.userRepository().userWithUsername(
      new TenantId(tenantId),
      username,
    );
    return user;
  }

  tenant(tenantId: string) {
    let tenant = this.tenantRepository().tenantOfId(new TenantId(tenantId));
    return tenant;
  }

  group(tenantId: string, groupName: string) {
    let group = this.groupRepository().groupNamed(
      new TenantId(tenantId),
      groupName,
    );
    return group;
  }

  tenantRepository() {
    return this._tenantRepository;
  }

  groupRepository() {
    return this._groupRepository;
  }

  userRepository() {
    return this._userRepository;
  }

  groupMemberService() {
    return this._groupMemberService;
  }

  authenticationService() {
    return this._authenticationService;
  }

  TenantProvisioningService() {
    return this._tenantPrivisioningService;
  }
}
