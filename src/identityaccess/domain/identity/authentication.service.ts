import { EncryptionService } from './encryption.service';
import { AssertionConcern } from 'src/common';
import { UserRepository } from './user.repository';
import { TenantId } from './tenant-id';
import { TenantRepository } from './tenant.repository';
import { UserDescriptor } from './user-descriptor';

export class AuthenticateService extends AssertionConcern {
  private _encryptionService: EncryptionService;
  private _tenantRepository: TenantRepository;
  private _userRepository: UserRepository;

  constructor(
    tenantRepository: TenantRepository,
    userRepository: UserRepository,
    encryptionService: EncryptionService,
  ) {
    super();
    this._encryptionService = encryptionService;
    this._tenantRepository = tenantRepository;
    this._userRepository = userRepository;
  }

  authenticate(tenantId: TenantId, username: string, password: string) {
    this.assertArgumentNotNull(tenantId, 'TenantId must not be null.');
    this.assertArgumentNotEmpty(username, 'Username must be provided.');
    this.assertArgumentNotEmpty(password, 'Password must be provided.');

    let userDescriptor = UserDescriptor.nullDescriptorInstance();
    let tenant = this.tenantRepository().tenantOfId(tenantId);

    if (tenantId !== null && tenant.isActive()) {
      let encryptedPassword = this.encryptionService().encryptedValue(password);

      let user = this.userRepository().userFromAuthenticCredentials(
        tenantId,
        username,
        encryptedPassword,
      );
      if (user !== null && user.isEnabled()) {
        userDescriptor = user.userDescriptor();
      }
    }
    return userDescriptor;
  }

  private userRepository() {
    return this._userRepository;
  }

  private tenantRepository() {
    return this._tenantRepository;
  }

  private encryptionService() {
    return this._encryptionService;
  }
}
