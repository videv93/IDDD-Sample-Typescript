import { IllegalArgumentException } from 'src/common/illegal-argument.exception';
import { Entity } from '../../entity';
import { TenantId } from '../../tenant/tenant-id';
import { BacklogItem } from '../backlogitem/backlog-item';
import { ProductId } from '../product-id';
import { CommittedBacklogItem } from './commited-backlog-item';
import { SprintId } from './sprint-id';

export class Sprint extends Entity {
  private _backlogItems: Set<CommittedBacklogItem>;
  private _begins: Date;
  private _ends: Date;
  private _goals: string;
  private _name: string;
  private _productId: ProductId;
  private _retrospective: string;
  private _sprintId: SprintId;
  private _tenantId: TenantId;

  constructor(
    tenantId: TenantId,
    productId: ProductId,
    sprintId: SprintId,
    name: string,
    goals: string,
    begins: Date,
    ends: Date,
  ) {
    super();
    if (ends.getTime() > begins.getTime()) {
      throw new IllegalArgumentException(
        'Sprint must not end before it begin.',
      );
    }

    this.begins = begins;
    this.ends = ends;
    this.goals = goals;
    this.name = name;
    this.productId = productId;
    this.sprintId = sprintId;
    this.tenantId = tenantId;
  }

  adjustGoals(goals: string) {
    this.goals = goals;
  }

  captureRetrospectiveMeetingResults(retrospective: string) {
    this.retrospective = retrospective;
    // TODO: publish event
  }

  commit(backlogItem: BacklogItem) {
    this.assertArgumentEquals(
      this.tenantId,
      backlogItem.tenantId,
      'Must have same tenants.',
    );
    this.assertArgumentEquals(
      this.productId,
      backlogItem.productId,
      'Must have same products.',
    );

    const ordering = this.backlogItems.size + 1;

    const committedBacklogItem = new CommittedBacklogItem(
      this.tenantId,
      this.sprintId,
      backlogItem.backlogItemId,
      ordering,
    );

    this.backlogItems.add(committedBacklogItem);
  }

  uncommit(backlogItem: BacklogItem) {
    const cbi = new CommittedBacklogItem(
      this.tenantId,
      this.sprintId,
      backlogItem.backlogItemId,
    );

    this.backlogItems.delete(cbi);
  }

  get backlogItems() {
    return this._backlogItems;
  }

  set backlogItems(backlogItems: Set<CommittedBacklogItem>) {
    this._backlogItems = backlogItems;
  }

  get retrospective() {
    return this._retrospective;
  }

  set retrospective(retrospective: string) {
    this._retrospective = retrospective;
  }

  get begins() {
    return this._begins;
  }

  set begins(begins: Date) {
    this.assertArgumentNotNull(begins, 'The begins must be provided.');
    this._begins = begins;
  }

  get ends() {
    return this._ends;
  }

  set ends(ends: Date) {
    this.assertArgumentNotNull(ends, 'The ends must be provide.');
    this._ends = ends;
  }

  get goals() {
    return this._goals;
  }

  set goals(goals: string) {
    this.assertArgumentLength(
      goals,
      1,
      500,
      'The goals must be 500 characters or less.',
    );
    this._goals = goals;
  }

  get name() {
    return this._name;
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

  get productId() {
    return this._productId;
  }

  set productId(productId: ProductId) {
    this.assertArgumentNotNull(productId, 'The product id must be provided. ');
    this._productId = productId;
  }

  get sprintId() {
    return this._sprintId;
  }

  set sprintId(sprintId: SprintId) {
    this.assertArgumentNotNull(sprintId, 'The sprint id must be provided.');
    this._sprintId = sprintId;
  }

  get tenantId() {
    return this._tenantId;
  }

  set tenantId(tenantId: TenantId) {
    this.assertArgumentNotNull(tenantId, 'The tenant id must be provided.');
    this._tenantId = tenantId;
  }
}
