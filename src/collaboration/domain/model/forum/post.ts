import { DomainEvent } from "src/common/domain/model";
import { EventSourceRootEntity } from "src/common/domain/model/event-source-root-entity";
import { Author } from "../collaborator/author";
import { Tenant } from "../tenant/tenant";
import { DiscussionId } from "./discussion-id";
import { ForumId } from "./forum-id";
import { PostContentAltered } from "./post-content-altered";
import { PostId } from "./post-id";
import { PostedToDiscussion } from "./posted-to-discussion";

export class Post extends EventSourceRootEntity {
  private _author: Author;
  private _bodyText: string;
  private _changeOn: Date;
  private _createOn: Date;
  private _discussionId: DiscussionId;
  private _forumId: ForumId;
  private _postId: PostId;
  private _replyToPostId: PostId;
  private _subject: string;
  private _tenant: Tenant;

  constructor(eventStream: DomainEvent[], streamVersion: number) {
    super(eventStream, streamVersion);
  }

  constructor(tenant: Tenant, forumId: ForumId, discussionId: DiscussionId,
    postId: PostId, author: Author, subject: string, bodyText: string) {
    super();
    this(tenant, forumId, discussionId, null postId, author, subject, bodyText)
  }

  constructor(tenant: Tenant, forumId: ForumId, discussionId: DiscussionId,
    replyToPost: PostId, postId: PostId, author: Author, subject: string, bodyText: string) {
    super();
    this.assertArgumentNotNull(author, "The author must be provided.");
    this.assertArgumentNotEmpty(bodyText, "The body text must be provided.")
    this.assertArgumentNotNull(discussionId, "The discussion id must be provided.")
    this.assertArgumentNotNull(forumId, "The forum id must be provided.")
    this.assertArgumentNotNull(postId, "The post id must be provided.")
    this.assertArgumentNotEmpty(subject, "The subject must be provided.")
    this.assertArgumentNotNull(tenant, "The tenant must be provided.")
    this.apply(new PostedToDiscussion(tenant, forumId, discussionId,
      replyToPost, postId, author, subject, bodyText))
  }


  get author() {
    return this._author;
  }

  get bodyText() {
    return this._bodyText;
  }

  get createdOn() {
    return this._createOn;
  }

  get changeOn() {
    return this._changeOn;
  }

  get discussionId() {
    return this._discussionId;
  }

  get forumId() {
    return this._forumId;
  }

  get postId() {
    return this._postId;
  }

  get replyToPostId() {
    return this._replyToPostId;
  }

  get subject() {
    return this._subject;
  }

  get tenant() {
    return this._tenant;
  }

  alterPostContent(subject: string, bodyText: string) {
    this.assertArgumentNotEmpty(subject, "The subject must be provided.");
    this.assertArgumentNotEmpty(bodyText, "The body text must be provided.");

    this.apply(new PostContentAltered(this.tenant, this.forumId, this.discussionId, this.postId,
      subject, bodyText))
  }

  protected when(event: PostContentAltered) {
    this.bodyText = event.bodyText;
    this.changeOn = event.occurredOn();
    this.subject = event.subject;
  }

  protected when(event: PostedToDiscussion) {
    this.author = event.author;
    this.bodyText = event.bodyText;
    this.changeOn = event.occurredOn();
    this.createdOn = event.occurredOn();
    this.discussionId = event.discussionId;
    this.forumId = event.forumId;
    this.postId = event.postId;
    this.replyToPostId = event.replyToPost;
    this.subject = event.subject;
    this.tenant = event.tenant;
  }

  set author(author: Author) {
    this._author = author;
  }

  set createdOn(createdOn: Date) {
    this._createOn = createdOn;
  }


  set bodyText(bodyText: string) {
    this._bodyText = bodyText;
  }

  set changeOn(changeOn: Date) {
    this._changeOn = changeOn;
  }

  set subject(subject: string) {
    this._subject = subject;
  }

  set tenant(tenant: Tenant) {
    this._tenant = tenant;
  }

  set discussionId(discussionId: DiscussionId) {
    this._discussionId = discussionId;
  }

  set forumId(forumId: ForumId) {
    this._forumId = forumId;
  }

  set postId(postId: PostId) {
    this._postId = postId;
  }

  set replyToPostId(replyToPost: PostId) {
    this._replyToPostId = replyToPost;
  }
}
