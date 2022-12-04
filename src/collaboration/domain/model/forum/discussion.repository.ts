import { Tenant } from "../tenant/tenant";
import { Discussion } from "./discussion";
import { DiscussionId } from "./discussion-id";

export interface DiscussionRepository {
  discussionOfId(tenant: Tenant, discussionId: DiscussionId): Discussion;
  nextIdentity(): DiscussionId;
  save(discussion: Discussion): void;
}
