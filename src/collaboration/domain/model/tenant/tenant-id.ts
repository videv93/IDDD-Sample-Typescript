import { AbstractId } from 'src/common/domain/model/abstract-id';

export class TenantId extends AbstractId {
  constructor(id: string) {
    super(id);
  }

  hashOddValue() {
    return 3517;
  }

  hashPrimeValue() {
    return 7;
  }
}
