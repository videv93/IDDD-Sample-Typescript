import { Tenant } from "../tenant/tenant";
import { Post } from "./post";
import { PostId } from "./post-id";

export interface PostRepository {
  nextIdentity(): PostId;
  postOfId(tenant: Tenant, postId: PostId): Post;
  save(post: Post): void;
}
