import { TenantId } from "./tenant-id";
import { Tenant } from './tenant';

export interface TenantRepository {
  add(tenant: Tenant): void;
  nextIdentity(): TenantId;
  remove(tenant: Tenant): void;
  tenantNamed(name: string): Tenant;
  tenantOfId(tenantId: TenantId): Tenant;

}
