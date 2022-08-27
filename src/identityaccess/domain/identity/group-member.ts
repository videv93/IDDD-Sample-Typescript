import { IdentifiedValueObject } from 'src/common/domain/model/identified-value-object';
import { GroupMemberType, isGroup, isUser } from './group-member-type';
import { TenantId } from './tenant-id';

export class GroupMember extends IdentifiedValueObject {
  private _name: string;
  private _tenantId: TenantId;
  private _type: GroupMemberType;

  constructor(tenantId: TenantId, name: string, type: GroupMemberType) {
    super();
    this.setName(name);
    this.setTenantId(tenantId);
    this.setType(type);
  }

  isGroup() {
    return isGroup(this.type());
  }

  isUser() {
    return isUser(this.type());
  }

  name() {
    return this._name;
  }

  tenantId() {
    return this._tenantId;
  }

  type() {
    return this._type;
  }

  protected setName(name: string): void {
    this.assertArgumentNotEmpty(name, 'Member name is required');
    this.assertArgumentLength(
      name,
      1,
      100,
      'Member name must be 100 characters or less.',
    );

    this._name = name;
  }

  protected setTenantId(tenantId: TenantId) {
    this.assertArgumentNotNull(tenantId, 'The tenantId must be provided.');

    this._tenantId = tenantId;
  }

  protected setType(type: GroupMemberType) {
    this.assertArgumentNotNull(type, 'The type must be provided');

    this._type = type;
  }

  equals(member: GroupMember) {
    let equals = false;
    if (member !== null) {
      equals =
        this.tenantId().equals(member.tenantId()) &&
        this.name() === member.name() &&
        this.type() === member.type();
    }
    return equals;
  }
}
