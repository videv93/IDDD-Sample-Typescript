import { Tenant } from "../tenant/tenant";
import { Forum } from "./forum";
import { ForumId } from "./forum-id";

export interface ForumRepository {
  forumOfId(tenant: Tenant, forumId: ForumId): Forum;
  nextIdentity(): ForumId;
  save(forum: Forum): void;
}
