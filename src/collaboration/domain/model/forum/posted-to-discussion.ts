import { DomainEvent } from "src/common/domain/model";
import { Author } from "../collaborator/author";
import { Tenant } from "../tenant/tenant";
import { DiscussionId } from "./discussion-id";
import { ForumId } from "./forum-id";
import { PostId } from "./post-id";

export class PostedToDiscussion implements DomainEvent {
  private _author: Author;
  private _bodyText: string;
  private _discussionId: DiscussionId;
  private _eventVersion: number;
  private _forumId: ForumId;
  private _occurredOn: Date;
  private _postId: PostId;
  private _replyToPost: PostId;
  private _subject: string;
  private _tenant: Tenant;

  constructor(tenant: Tenant, forumId: ForumId, discussionId: DiscussionId, replyToPostId: PostId,
    postId: PostId, author: Author, subject: string, bodyText: string) {
    this._author = author;
    this._bodyText = bodyText;
    this._discussionId = discussionId;
    this._eventVersion = 1;
    this._forumId = forumId;
    this._occurredOn = new Date();
    this._postId = postId;
    this._replyToPost = replyToPostId;
    this._subject = subject;
    this._tenant = tenant;
  }

  get author() {
    return this._author;
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

  get replyToPost() {
    return this._replyToPost;
  }

  get subject() {
    return this._subject;
  }

  get bodyText() {
    return this._bodyText;
  }

  get tenant() {
    return this._tenant;
  }

  occurredOn() {
    return this._occurredOn;
  }

  eventVersion() {
    return this._eventVersion;
  }
}
