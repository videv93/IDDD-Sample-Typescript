import { IllegalArgumentException } from 'src/common/illegal-argument.exception';
import { Entity } from '../../entity';
import { TenantId } from '../../tenant/tenant-id';
import { BacklogItem } from '../backlogitem/backlog-item';
import { ProductId } from '../product-id';
import { ReleaseId } from './release-id';
import { ScheduledBacklogItem } from './scheduled-backlog-item';

export class Release extends Entity {
  private _archived: boolean;
  private _backlogItems: Set<ScheduledBacklogItem>;
  private _begins: Date;
  private _description: string;
  private _ends: Date;
  private _name: string;
  private _productId: ProductId;
  private _releaseId: ReleaseId;
  private _tenantId: TenantId;

  constructor(
    tenantId: TenantId,
    productId: ProductId,
    releaseId: ReleaseId,
    name: string,
    description: string,
    begins: Date,
    ends: Date,
  ) {
    super();

    if (ends.getTime() < begins.getTime()) {
      throw new IllegalArgumentException(
        'Release end date must be after begin date.',
      );
    }

    this._archived = false;
    this.begins = begins;
    this.description = description;
    this.ends = ends;
    this.name = name;
    this.productId = productId;
    this.releaseId = releaseId;
    this.tenantId = tenantId;
  }

  schedule(backlogItem: BacklogItem) {
    this.assertArgumentEquals(
      this.tenantId,
      backlogItem.tenantId,
      'Must have same tenant id.',
    );
    this.assertArgumentEquals(
      this.productId,
      backlogItem.productId,
      'Must have same product id.',
    );

    const ordering = this.backlogItems.size + 1;

    const scheduledBacklogItem = new ScheduledBacklogItem(
      this.tenantId,
      this.releaseId,
      backlogItem.backlogItemId,
      ordering,
    );

    this.backlogItems.add(scheduledBacklogItem);
  }

  unschedule(backlogItem: BacklogItem) {
    this.assertArgumentEquals(
      this.tenantId,
      backlogItem.tenantId,
      'Must have same tenant id.',
    );
    this.assertArgumentEquals(
      this.productId,
      backlogItem.productId,
      'Must have same product id.',
    );

    const scheduledBacklogItem = new ScheduledBacklogItem(
      this.tenantId,
      this.releaseId,
      backlogItem.backlogItemId,
      0,
    );

    this.backlogItems.delete(scheduledBacklogItem);
  }

  set begins(begins: Date) {
    this.assertArgumentNotNull(begins, 'The begins must be provided.');
    this._begins = begins;
  }

  set ends(ends: Date) {
    this.assertArgumentNotNull(ends, 'The ends must be provided.');
    this._ends = ends;
  }

  set description(description: string) {
    this.assertArgumentNotEmpty(
      description,
      'The description must be provided.',
    );
    this.assertArgumentLength(
      description,
      1,
      500,
      'The description must be 500 characters or less.',
    );
    this._description = description;
  }

  set name(name: string) {
    this.assertArgumentNotEmpty(name, 'The name must be provided.');
    this.assertArgumentLength(
      name,
      1,
      100,
      'The name must be 100 characters or less.',
    );

    this._name = name;
  }

  set tenantId(tenantId: TenantId) {
    this.assertArgumentNotNull(tenantId, 'The tenantId must be provided.');
    this._tenantId = tenantId;
  }

  get tenantId() {
    return this._tenantId;
  }

  set productId(productId: ProductId) {
    this.assertArgumentNotNull(productId, 'The productId must be provided.');
    this._productId = productId;
  }

  get productId() {
    return this._productId;
  }

  set releaseId(releaseId: ReleaseId) {
    this.assertArgumentNotNull(releaseId, 'The releaseId must be provided.');
    this._releaseId = releaseId;
  }
  get releaseId() {
    return this._releaseId;
  }

  get backlogItems() {
    return this._backlogItems;
  }
}
