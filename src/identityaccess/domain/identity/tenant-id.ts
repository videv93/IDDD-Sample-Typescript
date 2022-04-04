import { IllegalArgumentException } from 'src/common/illegal-argument.exception';
import { AbstractId } from 'src/common/domain/model/abstract-id';
import UUID from 'uuid';

export class TenantId extends AbstractId {
  constructor(id: string) {
    super(id);
  }
  protected validateId(id: string): void {
    try {
      UUID.parse(id);
    } catch (err) {
      throw new IllegalArgumentException('The id has an invalid format.');
    }
  }
}
