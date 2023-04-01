import { TenantId } from '../../tenant/tenant-id';
import { ProductId } from '../product-id';
import { Sprint } from './sprint';
import { SprintId } from './sprint-id';

export interface SprintRepository {
  allProductSprints(tenantId: TenantId, productId: ProductId): Sprint[];
  nextIdentity(): SprintId;
  remove(sprint: Sprint): void;
  removeAll(sprints: Sprint[]): void;
  save(sprint: Sprint): void;
  saveAll(sprints: Sprint[]): void;
  sprintOfId(tenantId: TenantId, sprintId: SprintId): Sprint;
}
