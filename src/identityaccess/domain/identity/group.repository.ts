import { TenantId } from './tenant-id';
import { Group } from './group';

export interface GroupRepository {
  add(group: Group): void;
  allGroups(tenantId: TenantId): Group[];
  groupNamed(tenantId: TenantId, name: string): Group;
  remove(group: Group): void;
}
