import { DomainEvent } from "src/common/domain/model";
import { EventSourceRootEntity } from "src/common/domain/model/event-source-root-entity";
import { IllegalArgumentException } from "src/common/illegal-argument.exception";
import { Author } from "../collaborator/author";
import { Creator } from "../collaborator/creator";
import { Moderator } from "../collaborator/moderator";
import { Tenant } from "../tenant/tenant";
import { Discussion } from "./discussion";
import { ForumClosed } from "./forum-closed";
import { ForumDescriptionChanged } from "./forum-description-changed";
import { ForumId } from "./forum-id";
import { ForumReopened } from "./forum-reopened";
import { ForumStarted } from "./forum-started";
import { ForumSubjectChanged } from "./forum-subject-changed";

export class Forum extends EventSourceRootEntity {
  private _closed: boolean;
  private _creator: Creator;
  private _description: string;
  private _exclusiveOwner: string;
  private _forumId: ForumId;
  private _moderator: Moderator;
  private _subject: string;
  private _tenant: Tenant;

  constructor(tenant: Tenant, forumId: ForumId, creator: Creator, moderator: Moderator, subject: string, description: string, exclusiveOwner: string) {
    super();
    this.assertArgumentNotNull(creator, "The creator must be provided.");
    this.assertArgumentNotEmpty(description, "The description must be provided.");
    this.assertArgumentNotNull(forumId, "The forum id must be provided.");
    this.assertArgumentNotNull(moderator, "The moderator must be provided.");
    this.assertArgumentNotEmpty(subject, "The subject must be provided.");
    this.assertArgumentNotNull(tenant, "The creator must be provided.");

    this.apply(new ForumStarted(tenant, forumId, creator,
      moderator, subject, description, exclusiveOwner));
  }

  constructor(eventStream: DomainEvent[], streamVersion: number) {
    super(eventStream, streamVersion);
  }

  assignModerator(moderator: Moderator) {
    this.assertStateFalse(this.isClosed(), "Forum is closed.");
    this.assertArgumentNotNull(moderator, "The moderator must be provided.");
    this.apply(new ForumModeratorChanged(this.tenant, this.forumId, moderator, this.exclusiveOwner))
  }

  changeDescription(description: string) {
    this.assertStateFalse(this.isClosed(), "Forum is closed.");
    this.assertArgumentNotEmpty(description, "The description must be provided.");
    this.apply(new ForumDescriptionChanged(this.tenant, this.forumId, description, this.exclusiveOwner));
  }

  changeSubject(subject: string) {
    this.assertStateFalse(this.isClosed(), "Forum is closed.");
    this.assertArgumentNotEmpty(subject, "The subject must be provided.");
    this.apply(new ForumSubjectChanged(this.tenant, this.forumId, subject, this.exclusiveOwner));
  }

  close() {
    this.assertStateFalse(this.isClosed(), "Forum is already closed.");
    this.apply(new ForumClosed(this.tenant, this.forumId, this.exclusiveOwner));
  }

  get moderator() {
    return this._moderator;
  }

  get tenant() {
    return this._tenant;
  }

  get forumId() {
    return this._forumId;
  }

  get exclusiveOwner() {
    return this._exclusiveOwner;
  }

  isClosed() {
    return this._closed;
  }

  hasExclusiveOwner() {
    return this.exclusiveOwner != null;
  }

  isModeratedBy(moderator: Moderator) {
    return this.moderator.equals(moderator);
  }

  moderatePost(post: Post, moderator: MOderator, subject: string, bodyText: string) {
    this.assertStateFalse(this.isClosed(), "Forum is closed.");
    this.assertArgumentNotNull(post, "Post may not be null.");
    this.assertArgumentEquals(post.forumId, this.forumId, "Not a post of this forum.");
    this.assertStateTrue(this.isModeratedBy(moderator), "Not the moderator of this forum")

    post.alterPostContent(subject, bodyText);
  }

  reopen() {
    this.assertStateTrue(this.isClosed(), "Forum is not closed");
    this.apply(new ForumReopened(this.tenant, this.forumId, this.exclusiveOwner));
  }

  startDiscussion(forrumIdentityService: ForrumIdentityService, author: Author, subject: string) {
    return this.startDiscussionFor(forrumIdentityService, author, subject, null);
  }

  startDiscussionFor(forrumIdentityService: ForrumIdentityService, author: string, subject: string, exclusiveOwner: string) {
    if (this.isClosed()) {
      throw new IllegalArgumentException("Forum is closed.");
    }

    let discussion: Discussion = new Discussion(this.tenant, this.forumId, forrumIdentityService.nextDiscussionId(), author, subject, exclusiveOwner);
    return discussion;
  }

  when(event: ForumClosed) {
    this._closed = true;
  }

  when(event: ForumDescriptionChanged) {
    this._description = event.description;
  }

  when(event: ForumReopened) {
    this._closed = false;
  }

  when(event: ForumStarted) {
    this._creator = event.creator;
    this._description = event.description;
    this._exclusiveOwner = event.exclusiveOwner;
    this._forumId = event.forumId;
    this._moderator = event.moderator;
    this._subject = event.subject;
    this._tenant = event.tenant;
  }
}
