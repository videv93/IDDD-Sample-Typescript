import { ConcurrencySafeEntity } from 'src/common/domain/model/concurrency-safe-entity';
import { TenantId } from './tenant-id';

export class Group extends ConcurrencySafeEntity {
  public static ROLE_GROUP_PREFIX = 'ROLE-INTERNAL-GROUP';
  private description: string;
  private groupMembers: Set<GroupMember>;
  private name: string;
  private tenantId: TenantId;

  constructor(tenantId: TenantId, name: string, description: string) {
    super();
    this.setDescription(description);
    this.setName(name);
    this.setTenantId(tenantId);
  }

  protected setDescription(description: string) {
    this.assertArgumentNotEmpty(description, 'Group description is required.');
    this.assertArgumentLength(
      description,
      1,
      250,
      'Group description must be 250 characters or less',
    );

    this.description = description;
  }

  protected setName(name: string): void {}
}
