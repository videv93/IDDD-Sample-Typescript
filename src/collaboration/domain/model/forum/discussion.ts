import { EventSourceRootEntity } from 'src/common/domain/model/event-source-root-entity';
import { IllegalArgumentException } from 'src/common/illegal-argument.exception';
import { Author } from '../collaborator/author';
import { Tenant } from '../tenant/tenant';
import { DiscussionClosed } from './discussion-closed';
import { DiscussionId } from './discussion-id';
import { DiscussionReopened } from './discussion-reopened';
import { DiscussionStarted } from './discussion-started';
import { ForumId } from './forum-id';
import { ForumIdentityService } from './forum-identity.service';
import { Post } from './post';
import { PostId } from './post-id';

export class Discussion extends EventSourceRootEntity {
  private _author: Author;
  private _closed: boolean;
  private _discussionId: DiscussionId;
  private _exclusiveOwner: string;
  private _forumId: ForumId;
  private _subject: string;
  private _tenant: Tenant;

  /*
  constructor(eventStream: DomainEvent[], streamVersion: number) {
    super(eventStream, streamVersion);
  }
  */

  constructor(
    tenantId: Tenant,
    forumId: ForumId,
    discussionId: DiscussionId,
    author: Author,
    subject: string,
    exclusiveOwner: string,
  ) {
    super();
    this.assertArgumentNotNull(author, 'The author must be provided.');
    this.assertArgumentNotNull(
      discussionId,
      'The discussion id must be provided.',
    );
    this.assertArgumentNotNull(forumId, 'The forum id must be provided.');
    this.assertArgumentNotNull(tenantId, 'The tenant must be provided.');

    this.apply(
      new DiscussionStarted(
        tenantId,
        forumId,
        discussionId,
        author,
        subject,
        exclusiveOwner,
      ),
    );
  }

  post(
    forumIdentityService: ForumIdentityService,
    author: Author,
    subject: string,
    bodyText: string,
    replyToPost?: PostId,
  ) {
    const post = new Post(
      this.tenant,
      this.forumId,
      this.discussionId,
      forumIdentityService.nextPostId(),
      author,
      subject,
      bodyText,
      replyToPost,
    );

    return post;
  }

  reopen() {
    if (this.isClosed) {
      throw new IllegalArgumentException('The discussion is not closed.');
    }

    this.apply(
      new DiscussionReopened(
        this.tenant,
        this.forumId,
        this.discussionId,
        this.exclusiveOwner,
      ),
    );
  }

  get author(): Author {
    return this._author;
  }

  set author(author: Author) {
    this._author = author;
  }

  set closed(isClosed: boolean) {
    this._closed = isClosed;
  }

  get discussionId() {
    return this._discussionId;
  }

  set discussionId(discussionId: DiscussionId) {
    this._discussionId = discussionId;
  }

  get exclusiveOwner() {
    return this._exclusiveOwner;
  }

  set exclusiveOwner(exclusiveOwner: string) {
    this._exclusiveOwner = exclusiveOwner;
  }

  get forumId() {
    return this._forumId;
  }

  set forumId(forumId: ForumId) {
    this._forumId = forumId;
  }

  get subject() {
    return this._subject;
  }

  set subject(subject: string) {
    this._subject = subject;
  }

  set tenant(tenant: Tenant) {
    this._tenant = tenant;
  }

  get tenant() {
    return this._tenant;
  }

  close() {
    if (this.isClosed()) {
      throw new IllegalArgumentException('This discussion is already closed.');
    }
    this.apply(
      new DiscussionClosed(
        this.tenant,
        this.forumId,
        this.discussionId,
        this.exclusiveOwner,
      ),
    );
  }

  isClosed() {
    return this._closed;
  }

  // TODO: fix duplicate method name
  when(event: DiscussionClosed): void {
    this.closed = true;
  }

  // TODO: fix duplicate method name
  when(event: DiscussionReopened) {
    this.closed = false;
  }

  // TODO: fix duplicate method name
  when(event: DiscussionStarted) {
    this.author = event.author;
    this.discussionId = event.discussionId;
    this.exclusiveOwner = event.exclusiveOwner;
    this.forumId = event.forumId;
    this.subject = event.subject;
    this.tenant = event.tenant;
  }
}
