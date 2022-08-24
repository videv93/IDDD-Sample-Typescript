import { ConcurrencySafeEntity } from 'src/common/domain/model/concurrency-safe-entity';
import { Group } from '../identity/group';
import { TenantId } from '../identity/tenant-id';
import UUID from 'uuid';
import { User } from '../identity/user';

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
