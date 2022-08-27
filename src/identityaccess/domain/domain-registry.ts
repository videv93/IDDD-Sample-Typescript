import { EncryptionService } from './identity/encryption.service';

export class DomainRegistry {
  // TODO: init encryption service with implement class
  private static _encryptionService: EncryptionService;
  private static _passwordService: PasswordService;
  static encryptionService() {
    return this._encryptionService;
  }
  static passwordService() {
    return this._passwordService;
  }
}
