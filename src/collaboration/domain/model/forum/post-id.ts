import { AbstractId } from "src/common/domain/model/abstract-id";

export class PostId extends AbstractId {
  constructor(id: string) {
    super(id);
  }
}
