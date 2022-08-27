import { ConcurrencySafeEntity } from 'src/common/domain/model/concurrency-safe-entity';
import { TenantId } from './tenant-id';
import { GroupMember } from './group-member';
import UUID from 'uuid';
import { IllegalArgumentException } from 'src/common/illegal-argument.exception';
import { User } from './user';
import { GroupMemberService } from './group-member.service';

const ROLE_GROUP_PREFIX = 'ROLE-INTERNAL-GROUP';

export class Group extends ConcurrencySafeEntity {
  private _description: string;
  private _groupMembers: Set<GroupMember>;
  private _name: string;
  private _tenantId: TenantId;

  constructor(tenantId: TenantId, name: string, description: string) {
    super();
    this.setDescription(description);
    this.setName(name);
    this.setTenantId(tenantId);
  }

  description() {
    return this._description;
  }

  groupMembers() {
    return this._groupMembers;
  }

  name() {
    return this._name;
  }

  tenantId() {
    return this._tenantId;
  }

  protected setDescription(description: string) {
    this.assertArgumentNotEmpty(description, 'Group description is required.');
    this.assertArgumentLength(
      description,
      1,
      250,
      'Group description must be 250 characters or less',
    );

    this._description = description;
  }

  isMember(user: User, groupMemberService: GroupMemberService) {
    this.assertArgumentNotNull(user, 'User must not be null');
    this.assertArgumentEquals(
      this.tenantId(),
      user.tenantId(),
      'Wrong tenant for this group',
    );
    this.assertArgumentTrue(user.isEnabled(), 'User is not enabled.');

    let isMember = this.groupMembers().has(user.toGroupMember());
    if (isMember) {
      isMember = groupMemberService.confirmUser(this, user);
    } else {
      isMember = groupMemberService.isUserInNestedGroup(this, user);
    }

    return isMember;
  }

  protected isInternalGroup(name: string) {
    return name.startsWith(ROLE_GROUP_PREFIX);
  }

  protected setName(name: string): void {
    this.assertArgumentNotEmpty(name, 'Group name is required');
    this.assertArgumentLength(
      name,
      1,
      100,
      'Group name must be 100 characters or less.',
    );

    if (this.isInternalGroup(name)) {
      let uuid = name.substring(ROLE_GROUP_PREFIX.length);
      try {
        UUID.parse(uuid);
      } catch (error) {
        throw new IllegalArgumentException(
          'The group name has an invalid format.',
        );
      }
    }

    this._name = name;
  }

  protected setTenantId(tenantId: TenantId): void {
    this.assertArgumentNotNull(tenantId, 'The tenantId must be provided.');
    this._tenantId = tenantId;
  }
}
