import { DomainEvent } from "src/common/domain/model";
import { Tenant } from "../tenant/tenant";
import { ForumId } from "./forum-id";

export class ForumClosed implements DomainEvent {
  private _eventVersion: number;
  private _exclusiveOwner: string;
  private _forumId: ForumId;
  private _occurredOn: Date;
  private _tenant: Tenant;

  constructor(tenant: Tenant, forumId: ForumId, exclusiveOwner: string) {
    this._eventVersion = 1;
    this._exclusiveOwner = exclusiveOwner;
    this._forumId = forumId;
    this._occurredOn = new Date();
    this._tenant = tenant;
  }

  eventVersion() {
    return this._eventVersion;
  }

  occurredOn() {
    return this._occurredOn;
  }

  get exclusiveOwner() {
    return this._exclusiveOwner;
  }

  get forumId() {
    return this._forumId;
  }

  get tenant() {
    return this._tenant;
  }
}
