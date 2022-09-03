import { AssertionConcern } from 'src/common';
import { TenantId } from './tenant-id';

export class UserDescriptor extends AssertionConcern {
  private emailAddress: string;
  private tenantId: TenantId;
  private username: string;

  static nullDescriptorInstance(): UserDescriptor {
    return new UserDescriptor();
  }

  constructor(tenantId: TenantId, username: string, emailAddress: string) {
    super();
    this.setEmailAddress(emailAddress);
    this.setTenantId(tenantId);
    this.setUsername(username);
  }

  setEmailAddress(emailAddress: string) {
    this.assertArgumentNotEmpty(
      emailAddress,
      'Email address must be provided.',
    );
  }
}
