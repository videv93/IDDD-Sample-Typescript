import { AbstractId } from "src/common/domain/model/abstract-id";

export class ForumId extends AbstractId {
  constructor(id: string) {
    super(id);
  }

  hashOddValue() {
    return 83713;
  }

  hashPrimeValue() {
    return 11;
  }
}
