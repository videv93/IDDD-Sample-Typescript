import { TenantId } from '../../tenant/tenant-id';
import { ProductId } from '../product-id';
import { Release } from './release';
import { ReleaseId } from './release-id';

export interface ReleaseRepository {
  allProductRelease(tenantId: TenantId, productId: ProductId): Release[];
  nextIdentity(): ReleaseId;
  releaseOfId(tenantId: TenantId, releaseId: ReleaseId): Release;

  remove(relaese: Release): void;
  removeAll(releases: Release[]): void;
  save(release: Release): void;
  saveAll(releases: Release[]): void;
}
