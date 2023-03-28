import { TenantId } from '../tenant/tenant-id';
import { Product } from './product';
import { ProductId } from './product-id';

export interface ProductRepository {
  allProductsOfTenant(tenantId: TenantId): Product[];
  nextIdentity(): ProductId;
  productOfDiscussionInitiationId(
    tenantId: TenantId,
    discussionInitiationId: string,
  ): Product;
  productOfId(tenantId: TenantId, productId: ProductId): Product;
  remove(product: Product): void;
  removeAll(products: Product[]): void;
  save(product: Product): void;
  saveAll(products: Product[]): void;
}
