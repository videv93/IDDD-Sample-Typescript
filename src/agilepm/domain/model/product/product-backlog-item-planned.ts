import { DomainEvent } from 'src/common/domain/model';
import { TenantId } from '../tenant/tenant-id';
import { BacklogItemId } from './backlogitem/backlog-item-id';
import { BacklogItemType } from './backlogitem/backlog-item-type';
import { StoryPoints } from './backlogitem/story-point';
import { ProductId } from './product-id';

export class ProductBacklogItemPlanned implements DomainEvent {
  private _backlogItemId: BacklogItemId;
  private _category: string;
  private _description: string;
  private _productId: ProductId;
  private _storyPoints: StoryPoints;
  private _summary: string;
  private _tenantId: TenantId;
  private _type: BacklogItemType;
  private _occurredOn: Date;
  private _eventVersion: number;

  constructor(
    tenantId: TenantId,
    productId: ProductId,
    backlogItemId: BacklogItemId,
    summary: string,
    category: string,
    type: BacklogItemType,
    storyPoints: StoryPoints,
  ) {
    this._backlogItemId = backlogItemId;
    this._category = category;
    this._tenantId = tenantId;
    this._productId = productId;
    this._summary = summary;
    this._type = type;
    this._storyPoints = storyPoints;
    this._eventVersion = 1;
    this._occurredOn = new Date();
  }

  occurredOn() {
    return this._occurredOn;
  }

  eventVersion() {
    return this._eventVersion;
  }
}
