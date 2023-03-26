import { Entity } from '../entity';
import { TenantId } from '../tenant/tenant-id';
import { BacklogItemId } from './backlogitem/backlog-item-id';
import { ProductId } from './product-id';

export class ProductBacklogItem extends Entity {
  private _backlogItemId: BacklogItemId;
  private _ordering: number;
  private _productId: ProductId;
  private _tenantId: TenantId;

  constructor(
    tenantId: TenantId,
    productId: ProductId,
    backlogItemId: BacklogItemId,
    ordering: number,
  ) {
    super();
    this.backlogItemId = backlogItemId;
    this.ordering = ordering;
    this.productId = productId;
    this.tenantId = tenantId;
  }

  get backlogItemId() {
    return this._backlogItemId;
  }

  set backlogItemId(backlogItemId: BacklogItemId) {
    this.assertArgumentNotNull(
      backlogItemId,
      'The backlog item id must be provided.',
    );
    this._backlogItemId = backlogItemId;
  }

  get ordering() {
    return this._ordering;
  }

  set ordering(ordering: number) {
    this._ordering = ordering;
  }

  get productId() {
    return this._productId;
  }

  set productId(productId: ProductId) {
    this.assertArgumentNotNull(productId, 'The product id must be provided.');
    this._productId = productId;
  }

  get tenantId() {
    return this._tenantId;
  }

  set tenantId(tenantId: TenantId) {
    this.assertArgumentNotNull(tenantId, 'The tenantId id must be provided. ');
    this._tenantId = tenantId;
  }

  reorderFrom(id: BacklogItemId, ordering: number) {
    if (this.backlogItemId == id) {
      this.ordering = ordering;
    } else if (this.ordering >= ordering) {
      this.ordering = this.ordering + 1;
    }
  }
}
