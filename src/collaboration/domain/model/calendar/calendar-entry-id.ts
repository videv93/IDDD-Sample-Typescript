import { AbstractId } from 'src/common/domain/model/abstract-id';

export class CalendarEntryId extends AbstractId {
  constructor(id: string) {
    super(id);
  }

  hashOddValue() {
    return 9316;
  }

  hashPrimeValue() {
    return 67;
  }
}
