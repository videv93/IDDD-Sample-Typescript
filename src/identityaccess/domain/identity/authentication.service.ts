import { EncryptionService } from './encryption.service';
import { AssertionConcern } from 'src/common';
import { UserRepository } from './user.repository';
import { GroupRepository } from './group.repository';
import { TenantId } from './tenant-id';

export class AuthenticateService extends AssertionConcern {
  private _encryptionService: EncryptionService;
  private _tenantRepository: TenantRepository;
  private _userRepository: UserRepository;

  constructor(tenantRepository: TenantRepository, userRepository: UserRepository, encryptionService: EncryptionService) {
    super();
    this._encryptionService = encryptionService;
    this._tenantRepository = tenantRepository;
    this._userRepository = userRepository;
  }

  authenticate(tenantId: TenantId, username: string, password: string) {

  }

  private encryptionService() {
    return this._encryptionService;
  }

}
