import { IdentifiedValueObject } from 'src/common/domain/model/identified-value-object';

export class GroupMember extends IdentifiedValueObject {
  private name: string;
  private tenantId: TenantId;
  private type: GroupMemberType;
}
