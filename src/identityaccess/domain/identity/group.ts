import { ConcurrencySafeEntity } from 'src/common/domain/model/concurrency-safe-entity';
import { TenantId } from './tenant-id';
import { GroupMember } from './group-member';
import UUID from 'uuid';
import { IllegalArgumentException } from 'src/common/illegal-argument.exception';
import { User } from './user';
import { GroupMemberService } from './group-member.service';
import { DomainEventPublisher } from 'src/common/domain/model/domain-event-publisher';
import { GroupMemberType } from './group-member-type';
import { GroupGroupAdded } from './group-group-added';
import { GroupUserAdded } from './group-user-added';
import { GroupGroupRemoved } from './group-group-removed';
import { GroupUserRemoved } from './group-user-removed';

export class Group extends ConcurrencySafeEntity {
  static ROLE_GROUP_PREFIX = 'ROLE-INTERNAL-GROUP';
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

  addGroup(group: Group, groupMemberService: GroupMemberService) {
    this.assertArgumentNotNull(group, 'Group must not be null.');
    this.assertArgumentEquals(
      this.tenantId(),
      group.tenantId(),
      'Wrong tenant for this group.',
    );
    this.assertArgumentFalse(
      groupMemberService.isMemberGroup(group, this.toGroupMember()),
      'Group recursion.',
    );

    if (
      this.groupMembers().add(group.toGroupMember()) &&
      !this.isInternalGroup()
    ) {
      DomainEventPublisher.instance().publish(
        new GroupGroupAdded(this.tenantId(), this.name(), group.name()),
      );
    }
  }

  addUser(user: User) {
    this.assertArgumentNotNull(user, 'User must not be null.');
    this.assertArgumentNotEquals(
      this.tenantId(),
      user.tenantId(),
      'Wrong tenant for this group.',
    );
    this.assertArgumentTrue(user.isEnabled(), 'User is not enabled.');

    if (
      this.groupMembers().add(user.toGroupMember()) &&
      !this.isInternalGroup()
    ) {
      DomainEventPublisher.instance().publish(
        new GroupUserAdded(this.tenantId(), this.name(), user.username()),
      );
    }
  }

  removeGroup(group: Group) {
    this.assertArgumentNotNull(group, 'Group must not be null.');
    this.assertArgumentEquals(
      this.tenantId(),
      group.tenantId(),
      'Wrong tenant for this group.',
    );

    if (
      this.groupMembers().delete(group.toGroupMember()) &&
      !this.isInternalGroup()
    ) {
      DomainEventPublisher.instance().publish(
        new GroupGroupRemoved(this.tenantId(), this.name(), group.name()),
      );
    }
  }

  removeUser(user: User) {
    this.assertArgumentNotNull(user, 'User must not be null.');
    this.assertArgumentEquals(
      this.tenantId(),
      user.tenantId(),
      'Wrong tenant for this group.',
    );

    if (
      this.groupMembers().delete(user.toGroupMember()) &&
      !this.isInternalGroup()
    ) {
      DomainEventPublisher.instance().publish(
        new GroupUserRemoved(this.tenantId(), this.name(), user.username()),
      );
    }
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

  protected isInternalGroup(name?: string) {
    return name.startsWith(Group.ROLE_GROUP_PREFIX);
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
      let uuid = name.substring(Group.ROLE_GROUP_PREFIX.length);
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

  protected toGroupMember(): GroupMember {
    let groupMember = new GroupMember(
      this.tenantId(),
      this.name(),
      GroupMemberType.GROUP,
    );
    return groupMember;
  }
}
