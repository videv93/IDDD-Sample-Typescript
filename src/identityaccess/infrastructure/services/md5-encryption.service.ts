import { AssertionConcern } from 'src/common';
import crypto from 'crypto';
import { IllegalArgumentException } from 'src/common/illegal-argument.exception';

export class MD5EncryptionService extends AssertionConcern {
  public encryptedValue(value: string): string {
    this.assertArgumentNotEmpty(value, 'The value is required');

    let encryptedValue = '';

    try {
      encryptedValue = crypto.createHash('md5').update(value).digest('hex');
    } catch (error) {
      throw new IllegalArgumentException('The value is invalid');
    }
    return encryptedValue;
  }
}
