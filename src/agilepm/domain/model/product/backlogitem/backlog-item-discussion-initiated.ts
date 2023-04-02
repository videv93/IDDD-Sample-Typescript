import { DomainEvent } from 'src/common/domain/model';
import { TenantId } from '../../tenant/tenant-id';
import { BacklogItemDiscussion } from './backlog-item-discussion';
import { BacklogItemId } from './backlog-item-id';

export class BacklogItemDiscussionInitiated implements DomainEvent {
  private _backlogItemId: BacklogItemId;
  private _discussion: BacklogItemDiscussion;
  private _eventVersion: number;
  private _occurredOn: Date;
  private _tenantId: TenantId;

  constructor(
    aTenantId: TenantId,
    aBacklogItemId: BacklogItemId,
    aDiscussion: BacklogItemDiscussion,
  ) {
    this._backlogItemId = aBacklogItemId;
    this._discussion = aDiscussion;
    this._eventVersion = 1;
    this._occurredOn = new Date();
    this._tenantId = aTenantId;
  }

  eventVersion() {
    return this._eventVersion;
  }

  occurredOn() {
    return this._occurredOn;
  }

  get backlogItemId(): BacklogItemId {
    return this._backlogItemId;
  }

  get dicussion(): BacklogItemDiscussion {
    return this._discussion;
  }

  get tenantId(): TenantId {
    return this._tenantId;
  }
}
