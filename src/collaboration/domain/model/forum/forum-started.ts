import { Creator } from "../collaborator/creator";
import { Moderator } from "../collaborator/moderator";
import { Tenant } from "../tenant/tenant";
import { ForumId } from "./forum-id";

export class ForumStarted implements DomainEvent {
  private _creator: Creator;
  private _description: string;
  private _eventVersion: number;
  private _exclusiveOwner: string;
  private _forumId: ForumId;
  private _moderator: Moderator;
  private _occurredOn: Date;
  private _subject: string;
  private _tenant: Tenant;

  constructor(tenant: Tenant, forumId: ForumId, creator: Creator, moderator: Moderator, subject: string, description: string, exclusiveOwner: string) {
    this._creator = creator;
    this._description = description;
    this._eventVersion = 1;
    this._exclusiveOwner = exclusiveOwner;
    this._forumId = forumId;
    this._moderator = moderator;
    this._occurredOn = new Date();
    this._subject = subject;
    this._tenant = tenant;
  }

  get tenant() {
    return this._tenant;
  }

  get subject() {
    return this._subject;
  }

  get creator() {
    return this._creator;
  }

  get description() {
    return this._description;
  }

  get exclusiveOwner() {
    return this._exclusiveOwner;
  }

  get forumId() {
    return this._forumId;
  }

  get moderator() {
    return this._moderator;
  }

  eventVersion() {
    return this._eventVersion;
  }

  occurredOn() {
    return this._occurredOn;
  }
}
