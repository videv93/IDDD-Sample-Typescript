import { AbstractId } from 'src/common/domain/model/abstract-id';

export class Tenant extends AbstractId {
  constructor(id: string) {
    super(id);
  }

  hashOddValue(): number {
    return 3517;
  }

  hashPrimeValue(): number {
    return 7;
  }
}
