import { DomainEvent } from "src/common/domain/model";
import { Author } from "../collaborator/author";
import { Tenant } from "../tenant/tenant";
import { DiscussionId } from "./discussion-id";
import { ForumId } from "./forum-id";

export class DiscussionStarted implements DomainEvent {
  private _author: Author;
  private _discussionId: DiscussionId;
  private _eventVersion: number;
  private _exclusiveOwner: string;
  private _forumId: ForumId;
  private _occurredOn: Date;
  private _subject: string;
  private _tenant: Tenant;

  constructor(tenant: Tenant, forumId: ForumId, discussionId: DiscussionId, author: Author, subject: string, exclusiveOwner: string) {
    this._author = author;
    this._discussionId = discussionId;
    this._eventVersion = 1;
    this._exclusiveOwner = exclusiveOwner;
    this._forumId = forumId;
    this._occurredOn = new Date();
    this._subject = subject;
    this._tenant = tenant;
  }

  eventVersion() {
    return this._eventVersion;
  }

  occurredOn() {
    return this._occurredOn;
  }

  get author() {
    return this._author;
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

  get subject() {
    return this._subject;
  }

  get tenant() {
    return this._tenant;
  }
}
