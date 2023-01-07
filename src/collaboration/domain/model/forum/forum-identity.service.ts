import { DiscussionRepository } from './discussion.repository';
import { ForumRepository } from './forum.repository';
import { PostRepository } from './post.repository';

export class ForumIdentityService {
  private _discussionRepository: DiscussionRepository;
  private _forumRepository: ForumRepository;
  private _postRepository: PostRepository;

  constructor(
    forumRepository: ForumRepository,
    discussionRepository: DiscussionRepository,
    postRepository: PostRepository,
  ) {
    this._discussionRepository = discussionRepository;
    this._forumRepository = forumRepository;
    this._postRepository = postRepository;
  }

  nextDiscussionId() {
    return this.discussionRepository.nextIdentity();
  }

  nextForumId() {
    return this.forumRepository.nextIdentity();
  }

  nextPostId() {
    return this.postRepository.nextIdentity();
  }

  get discussionRepository() {
    return this._discussionRepository;
  }

  get forumRepository() {
    return this._forumRepository;
  }

  get postRepository() {
    return this._postRepository;
  }
}
