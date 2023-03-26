import { TenantId } from '../tenant/tenant-id';
import { Member } from './member';
import { ProductOwnerId } from './product-owner-id';

export class ProductOwner extends Member {
  get productOwnerId() {
    return new ProductOwnerId(this.tenantId, this.username);
  }
  constructor(
    tenantId: TenantId,
    username: string,
    firstName: string,
    lastName: string,
    emailAddress: string,
    initializedOn: Date,
  ) {
    super(tenantId, username, firstName, lastName, emailAddress, initializedOn);
  }
}
