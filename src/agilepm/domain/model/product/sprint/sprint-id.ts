import { ValueObject } from '../../value-object';

export class SprintId extends ValueObject {
  private _id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  get id() {
    return this._id;
  }

  set id(id: string) {
    this.assertArgumentNotEmpty(id, 'The id must be provided.');
    this.assertArgumentLength(
      id,
      1,
      36,
      'The id must be 36 characters or less.',
    );

    this._id = id;
  }
}
