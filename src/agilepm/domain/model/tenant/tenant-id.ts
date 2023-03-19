import { ValudeObject } from '../value-object';

export class TenantId extends ValudeObject {
  private _id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  get id() {
    return this._id;
  }

  set id(id: string) {
    this.assertArgumentNotEmpty(id, 'The tenant identity is required.');
    this.assertArgumentLength(
      id,
      1,
      36,
      'The tenant identity must be 36 characters or less.',
    );

    this._id = id;
  }
}
