import { TenantId } from '../tenant/tenant-id';
import { Member } from './member';

export class TeamMember extends Member {
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
