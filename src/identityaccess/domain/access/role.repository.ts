import { TenantId } from '../identity/tenant-id';
import { Role } from './role';

export interface RoleRepository {
  add(role: Role): void;
  allRoles(tenantId: TenantId): Array<Role>;
  remove(role: Role): void;
  roleNamed(tenantId: TenantId, roleName: string): Role;
}
