import { ConcurrencySafeEntity } from 'src/common/domain/model/concurrency-safe-entity';
import { Group } from '../identity/group';
import { TenantId } from '../identity/tenant-id';
import UUID from 'uuid';
import { User } from '../identity/user';
import { GroupMemberService } from '../identity/group-member.service';
import { DomainEventPublisher } from 'src/common/domain/model/domain-event-publisher';
import { UserAssignedToRole } from './user-assigned-to-role';
import { GroupAssignedToRole } from './group-assign-to-role';

export class Role extends ConcurrencySafeEntity {
  private _description: string;
  private _group: Group;
  private _name: string;
  private _supportsNesting: boolean = true;
  private _tenantId: TenantId;

  constructor(
    tenantId: TenantId,
    name: string,
    description: string,
    supportsNesting: boolean,
  ) {
    super();
    this.setDescription(description);
    this.setName(name);
    this.setSupportsNesting(supportsNesting);
    this.setTenantId(tenantId);

    this.createInternalGroup();
  }

  assignGroup(group: Group, groupMemberService: GroupMemberService) {
    this.assertStateTrue(
      this.supportsNesting(),
      'This role does not support group nesting.',
    );
    this.assertArgumentNotNull(group, 'Group must not be null.');
    this.assertArgumentNotEquals(
      this.tenantId(),
      group.tenantId(),
      'Wrong tenant for this group.',
    );

    this.group().addGroup(group, groupMemberService);

    DomainEventPublisher.instance().publish(
      new GroupAssignedToRole(this.tenantId(), this.name(), group.name()),
    );
  }

  assignUser(user: User) {
    this.assertArgumentNotNull(user, 'User must not be null.');
    this.assertArgumentEquals(
      this.tenantId(),
      user.tenantId(),
      'Wrong tenant for this user.',
    );

    this.group().addUser(user);

    DomainEventPublisher.instance().publish(
      new UserAssignedToRole(
        this.tenantId(),
        this.name(),
        user.username(),
        user.person().name().firstName(),
        user.person().name().lastName(),
        user.person().emailAddress().address(),
      ),
    );
  }

  tenantId(): TenantId {
    return this._tenantId;
  }

  name(): string {
    return this._name;
  }

  description(): string {
    return this._description;
  }

  supportsNesting(): boolean {
    return this._supportsNesting;
  }

  group(): Group {
    return this._group;
  }

  isInRole(user: User, groupMemberService: GroupMemberService) {
    return this.group().isMember(user, groupMemberService);
  }

  protected setDescription(description: string): void {
    this.assertArgumentNotEmpty(description, 'Role description is required.');
    this.assertArgumentLength(
      description,
      1,
      250,
      'Role description must be 250 characters or less.',
    );

    this._description = description;
  }

  protected setName(name: string): void {
    this.assertArgumentNotEmpty(name, 'Role name must be provided');
    this.assertArgumentLength(
      name,
      1,
      250,
      'Role name must be 100 characters or less',
    );

    this._name = name;
  }

  protected setSupportsNesting(supportsNesting: boolean): void {
    this._supportsNesting = supportsNesting;
  }

  protected setTenantId(tenantId: TenantId): void {
    this.assertArgumentNotNull(tenantId, 'The tenantId is required.');

    this._tenantId = tenantId;
  }

  protected setGroup(group: Group) {
    this._group = group;
  }

  protected createInternalGroup() {
    let groupName: string = Group.ROLE_GROUP_PREFIX + UUID.v4();
    this.setGroup(
      new Group(
        this.tenantId(),
        groupName,
        'Role backing group for: ' + this.name(),
      ),
    );
  }
}
