import { TenantId } from '../tenant/tenant-id';
import { ProductOwner } from './product-owner';

export interface ProductOwnerRepository {
  allProductOwnersOfTenant(tenantId: TenantId): ProductOwner[];
  productOwnerOfIdentity(tenantId: TenantId, username: string): ProductOwner;
  remove(productOwner: ProductOwner): void;
  removeAll(productOwners: ProductOwner[]): void;
  save(productOwner: ProductOwner): void;
  saveAll(productOwners: ProductOwner[]): void;
}
