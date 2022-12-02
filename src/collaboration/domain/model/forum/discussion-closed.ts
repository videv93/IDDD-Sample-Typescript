import { DomainEvent } from "src/common/domain/model";
import { Tenant } from "../tenant/tenant";
import { DiscussionId } from "./discussion-id";
import { ForumId } from "./forum-id";

export class DiscussionClosed implements DomainEvent {
  private _discussionId: DiscussionId;
  private _eventVersion: number;
  private _exclusiveOwner: string;
  private _forumId: ForumId;
  private _occurredOn: Date;
  private _tenant: Tenant;

  constructor(tenant: Tenant, forumId: ForumId, discussionId: DiscussionId, exclusiveOwner: string) {
    this._discussionId = discussionId;
    this._eventVersion = 1;
    this._exclusiveOwner = exclusiveOwner;
    this._forumId = forumId;
    this._occurredOn = new Date();
    this._tenant = tenant;
  }

  get discussionId() {
    return this._discussionId;
  }

  get exclusiveOwner() {
    return this._exclusiveOwner;
  }

  get forumId() {
    return this._forumId;
  }

  occurredOn() {
    return this._occurredOn;
  }

  eventVersion() {
    return this._eventVersion;
  }

  get tenant() {
    return this._tenant;
  }
}
