import { ValudeObject } from '../value-object';

export class DiscussionDescriptor extends ValudeObject {
  static UNDEFINED_ID: string = 'UNDEFINED';

  private _id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  set id(id: string) {
    this.assertArgumentNotEmpty(
      id,
      'The discussion identity must be provided.',
    );
    this.assertArgumentLength(
      id,
      1,
      36,
      'The discussion identity must be 36 characters or less.',
    );

    this._id = id;
  }

  get id() {
    return this._id;
  }

  isUndefined(): boolean {
    return this.id == DiscusionDescriptor.UNDEFINED_ID;
  }
}
