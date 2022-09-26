import { RoleRepository } from '../domain/access/role.repository';
import { GroupMemberService } from '../domain/identity/group-member.service';
import { GroupRepository } from '../domain/identity/group.repository';
import { TenantId } from '../domain/identity/tenant-id';
import { TenantRepository } from '../domain/identity/tenant.repository';
import { User } from '../domain/identity/user';
import { UserRepository } from '../domain/identity/user.repository';
import { AssignUserToRoleCommand } from './command/assign-user-to-role.command';
import { ProvisionRoleCommand } from './command/provision-role.command';

export class AccessApplicationService {
  private _groupRepository: GroupRepository;

  private _roleRepository: RoleRepository;

  private _tenantRepository: TenantRepository;

  private _userRepository: UserRepository;

  constructor() {}

  assignUserToRole(command: AssignUserToRoleCommand) {
    let tenantId = new TenantId(command.tenantId);

    let user = this.userRepository.userWithUsername(tenantId, command.username);

    if (user !== null) {
      let role = this.roleRepository.roleNamed(tenantId, command.roleName);
      if (role !== null) {
        role.assignUser(user);
      }
    }
  }

  isUserInRole(tenantId: string, username: string, roleName: string): boolean {
    let user = this.userInRole(tenantId, username, roleName);
    return user !== null;
  }

  provisionRole(command: ProvisionRoleCommand) {
    let tenantId = new TenantId(command.tenantId);
    let tenant = this.tenantRepository.tenantOfId(tenantId);
    let role = tenant.provisionRole2(
      command.roleName,
      command.description,
      command.isSupportNesting,
    );
    this.roleRepository.add(role);
  }

  userInRole(_tenantId: string, username: string, roleName: string): User {
    let userInRole = null;
    let tenantId = new TenantId(_tenantId);
    let user = this.userRepository.userWithUsername(tenantId, username);

    if (user !== null) {
      let role = this.roleRepository.roleNamed(tenantId, roleName);

      if (role !== null) {
        let groupMemberService = new GroupMemberService(
          this.userRepository,
          this.groupRepository,
        );
        if (role.isInRole(user, groupMemberService)) {
          userInRole = user;
        }
      }
    }
    return userInRole;
  }

  get groupRepository() {
    return this._groupRepository;
  }

  get roleRepository() {
    return this._roleRepository;
  }

  get tenantRepository() {
    return this._tenantRepository;
  }

  get userRepository() {
    return this._userRepository;
  }
}
