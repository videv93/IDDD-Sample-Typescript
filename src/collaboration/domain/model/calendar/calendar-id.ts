import { AbstractId } from 'src/common/domain/model/abstract-id';

export class CalendarId extends AbstractId {
  constructor(id: string) {
    super(id);
  }

  hashOddValue() {
    return 58847;
  }

  hashPrimeValue() {
    return 61;
  }
}
