import { DomainEvent } from "src/common/domain/model";
import { EventSourceRootEntity } from "src/common/domain/model/event-source-root-entity";
import { IllegalArgumentException } from "src/common/illegal-argument.exception";
import { Author } from "../collaborator/author";
import { Tenant } from "../tenant/tenant";
import { DiscussionClosed } from "./discussion-closed";
import { DiscussionId } from "./discussion-id";
import { DiscussionReopened } from "./discussion-reopened";
import { DiscussionStarted } from "./discussion-started";
import { ForumId } from "./forum-id";

export class Discussion extends EventSourceRootEntity {
  private _author: Author;
  private _closed: boolean;
  private _discussionId: DiscussionId;
  private _exclusiveOwner: string;
  private _forumId: ForumId;
  private _subject: string;
  private _tenant: Tenant;

  constructor(eventStream: DomainEvent[], streamVersion: number) {
    super(eventStream, streamVersion);
  }

  constructor(tenantId: Tenant, forumId: ForumId, discussionId: DiscussionId, authro: Author, subject: string, exclusiveOwner: string) {
    this.assertArgumentNotNull(author, "The author must be provided.");
    this.assertArgumentNotNull(discussionId, "The discussion id must be provided.");
    this.assertArgumentNotNull(forumId, "The forum id must be provided.");
    this.assertArgumentNotEmpty(tenantId, "The tenant must be provided.");

    this.apply(new DiscussionStarted(tenantId, forumId, discussionId, author, subject, exclusiveOwner))
  }

  set author(author: Author) {
    this._author = author;
  }

  set closed(isClosed: boolean) {
    this._closed = isClosed;
  }

  set discussionId(discussionId: DiscussionId) {
    this._discussionId = discussionId;
  }

  set exclusiveOwner(exclusiveOwner: string) {
    this._exclusiveOwner = exclusiveOwner;
  }

  set forumId(forumId: ForumId) {
    this._forumId = forumId;
  }

  set subject(subject: string) {
    this._subject = subject;
  }

  set tenant(tenant: Tenant) {
    this._tenant = tenant;
  }

  get forumId() {
    return this._forumId;
  }

  get author(): Author {
    return this._author;
  }

  get discussionId() {
    return this._discussionId;
  }

  get exclusiveOwner() {
    return this._exclusiveOwner;
  }

  get subject() {
    return this._subject;
  }

  get tenant() {
    return this._tenant;
  }

  close() {
    if (this.isClosed()) {
      throw new IllegalArgumentException("This discussion is already closed.");
    }
    this.apply(new DiscussionClosed(this.tenant, this.forumId, this.discussionId, this.exclusiveOwner))
  }

  isClosed() {
    return this._closed;
  }

  when(event: DiscussionClosed): void {
    this.closed = true;
  }

  when(event: DiscussionReopened) {
    this.closed = false;
  }

  when(event: DiscussionStarted) {
    this.author = event.author;
    this.discussionId = event.discussionId;
    this.exclusiveOwner = event.exclusiveOwner;
    this.forumId = event.forumId;
    this.subject = event.subject;
    this.tenant = event.tenant;
  }
}
