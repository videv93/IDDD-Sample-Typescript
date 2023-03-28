import { TenantId } from '../../tenant/tenant-id';
import { ProductId } from '../product-id';
import { ReleaseId } from '../release/release-id';
import { SprintId } from '../sprint/sprint-id';
import { BacklogItem } from './backlog-item';
import { BacklogItemId } from './backlog-item-id';

export interface BacklogItemRepository {
  allBacklogItemsComittedTo(
    tenantId: TenantId,
    sprintId: SprintId,
  ): BacklogItem[];
  allBacklogItemsScheduledFor(
    tenantId: TenantId,
    releaseId: ReleaseId,
  ): BacklogItem[];
  allOutstandingProductBacklogItems(
    tenantId: TenantId,
    productId: ProductId,
  ): BacklogItem[];
  allProductBacklogItems(
    tenantId: TenantId,
    productId: ProductId,
  ): BacklogItem[];
  backlogItemOfId(
    tenantId: TenantId,
    backlogItemId: BacklogItemId,
  ): BacklogItem;
  nextIdentity(): BacklogItemId;
  remove(backlogItem: BacklogItem): void;
  removeAll(backlogItems: BacklogItem[]): void;
  save(backlogItem: BacklogItem): void;
  saveAll(backlogItems: BacklogItem[]): void;
}
