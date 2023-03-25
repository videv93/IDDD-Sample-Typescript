import { Entity } from '../../entity';
import { TenantId } from '../../tenant/tenant-id';
import { BacklogItemId } from '../backlogitem/backlog-item-id';
import { SprintId } from './sprint-id';

export class CommittedBacklogItem extends Entity {
  private _backlogItemId: BacklogItemId;
  private _ordering: number;
  private _sprintId: SprintId;
  private _tenantId: TenantId;

  constructor(
    tenantId: TenantId,
    sprintId: SprintId,
    backlogItemId: BacklogItemId,
    ordering?: number,
  ) {
    super();
    this.tenantId = tenantId;
    this.sprintId = sprintId;
    this.backlogItemId = backlogItemId;
    this.ordering = ordering;
  }

  reorderFrom(id: BacklogItemId, orderOfPriority: number) {
    if (this.backlogItemId == id) {
      this.ordering = orderOfPriority;
    } else if (this.ordering >= orderOfPriority) {
      this.ordering += 1;
    }
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

  get sprintId() {
    return this._sprintId;
  }

  set sprintId(sprintId: SprintId) {
    this.assertArgumentNotNull(sprintId, 'The sprint id must be provided.');
    this._sprintId = sprintId;
  }

  get ordering() {
    return this._ordering;
  }

  set ordering(ordering: number) {
    this._ordering = ordering;
  }

  get tenantId() {
    return this._tenantId;
  }

  set tenantId(tenantId: TenantId) {
    this.assertArgumentNotNull(tenantId, 'The tenant id must be provided.');
    this._tenantId = tenantId;
  }
}
