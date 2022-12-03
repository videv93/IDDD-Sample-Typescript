import { DomainEvent } from "src/common/domain/model";
import { Tenant } from "../tenant/tenant";
import { ForumId } from "./forum-id";

export class ForumDescriptionChanged implements DomainEvent {
  private _description: string;
  private _eventVersion: number;
  private _exclusiveOwner: string;
  private _forumId: ForumId;
  private _occurredOn: Date;
  private _tenant: Tenant;

  constructor(tenant: Tenant, forumId: ForumId, description: string, exclusiveOwner: string) {
    this._description = description;
    this._eventVersion = 1;
    this._exclusiveOwner = exclusiveOwner;
    this._forumId = forumId;
    this._occurredOn = new Date();
    this._tenant = tenant;
  }

  get description() {
    return this._description;
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
