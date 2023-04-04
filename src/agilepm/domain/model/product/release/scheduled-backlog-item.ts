import { Entity } from '../../entity';
import { TenantId } from '../../tenant/tenant-id';
import { BacklogItemId } from '../backlogitem/backlog-item-id';
import { ReleaseId } from './release-id';

export class ScheduledBacklogItem extends Entity {
  private _backlogItemId: BacklogItemId;
  private _ordering: number;
  private _releaseId: ReleaseId;
  private _tenantId: TenantId;

  constructor(
    tenantId: TenantId,
    releaseId: ReleaseId,
    backlogItemId: BacklogItemId,
    ordering: number,
  ) {
    super();
    this.backlogItemId = backlogItemId;
    this._ordering = ordering;
    this.releaseId = releaseId;
    this.tenantId = tenantId;
  }

  set backlogItemId(backlogItemId: BacklogItemId) {
    this.assertArgumentNotNull(
      backlogItemId,
      'The backlogItemId must be provided.',
    );
    this._backlogItemId = backlogItemId;
  }

  get backlogItemId(): BacklogItemId {
    return this._backlogItemId;
  }

  get ordering(): number {
    return this._ordering;
  }

  set releaseId(releaseId: ReleaseId) {
    this.assertArgumentNotNull(releaseId, 'The releaseId must be provided.');
    this._releaseId = releaseId;
  }

  get releaseId(): ReleaseId {
    return this._releaseId;
  }

  set tenantId(tenantId: TenantId) {
    this.assertArgumentNotNull(tenantId, 'The tenantId must be provided.');
    this._tenantId = tenantId;
  }

  get tenantId(): TenantId {
    return this._tenantId;
  }
}
