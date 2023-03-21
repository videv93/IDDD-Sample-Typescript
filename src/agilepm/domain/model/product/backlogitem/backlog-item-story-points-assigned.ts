import { DomainEvent } from 'src/common/domain/model';
import { TenantId } from '../../tenant/tenant-id';
import { BacklogItemId } from './backlog-item-id';
import { StoryPoints } from './story-point';

export class BacklogItemStoryPointsAssigned implements DomainEvent {
  private _backlogItemId: BacklogItemId;
  private _storyPoints: StoryPoints;
  private _tenantId: TenantId;
  private _eventVersion: number;
  private _occurredOn: Date;

  constructor(
    tenantId: TenantId,
    backlogItemId: BacklogItemId,
    storyPoints: StoryPoints,
  ) {
    this._tenantId = tenantId;
    this._backlogItemId = backlogItemId;
    this._storyPoints = storyPoints;
    this._eventVersion = 1;
    this._occurredOn = new Date();
  }

  eventVersion() {
    return this._eventVersion;
  }

  occurredOn() {
    return this._occurredOn;
  }
}
