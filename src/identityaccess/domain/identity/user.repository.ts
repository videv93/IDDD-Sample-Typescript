import { TenantId } from './tenant-id';
import { User } from './user';

export interface UserRepository {
  add(user: User): void;
  allSimilarlyNamedUsers(
    tenantId: TenantId,
    firstNamePrefix: string,
    lastNamePrefix: string,
  ): User[];
  remove(user: User): void;
  userFromAuthenticCredentials(
    tenantId: TenantId,
    username: string,
    encryptedPassword: string,
  ): User;
  userWithUsername(tenantId: TenantId, username: string): User;
}
