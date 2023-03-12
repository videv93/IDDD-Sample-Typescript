import { ValudeObject } from "../value-object";

export class ProductId extends ValudeObject {
  private _id: string;

  constructor(id: string) {
    super();

    this.id = id;
  }

  set id(id: string) {
    this.assertArgumentNotEmpty(id, 'The id must be provided.');
    this.assertArgumentLength(id, 36, ' The id must be 36 characters or less.')

    this._id = id;
  }
}
