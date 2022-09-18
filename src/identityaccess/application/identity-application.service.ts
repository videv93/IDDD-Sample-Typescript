import { IllegalArgumentException } from 'src/common/illegal-argument.exception';
import { GroupMemberService } from '../domain/identity/group-member.service';
import { GroupRepository } from '../domain/identity/group.repository';
import { TenantId } from '../domain/identity/tenant-id';
import { TenantProvisioningService } from '../domain/identity/tenant-provising.service';
import { TenantRepository } from '../domain/identity/tenant.repository';
import { UserRepository } from '../domain/identity/user.repository';
import { ActivateTenantComand } from './command/activate-tenant.command';
import { AddGroupToGroupCommand } from './command/add-group-to-group.command';

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

  groupMemberService() {
    return this._groupMemberService;
  }
}
