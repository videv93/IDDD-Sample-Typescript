import { EncryptionService } from './encryption.service';
import { AssertionConcern } from 'src/common';

export class AuthenticateService extends AssertionConcern {
  private encryptionService: EncryptionService;
  private tenantRepository: TenantRepository;
  private userRepository: UserRepository;

  constructor() {}
}
