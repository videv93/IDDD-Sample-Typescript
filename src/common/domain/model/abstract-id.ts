import { AssertionConcern } from '../../assertion-concern';
import { Identity } from './identity';

export class AbstractId extends AssertionConcern implements Identity {
  private _id: string;

  constructor(id: string) {
    super();
    this.setId(id);
  }

  public id() {
    return this._id;
  }

  protected hashOddValue: () => number;
  protected hashPrimeValue: () => number;
  protected validateId(id: string): void {}

  private setId(id: string) {
    this.assertArgumentNotEmpty(id, 'The basic identity is required');
    this.assertArgumentLength(
      id,
      0,
      36,
      'The basic identity must be 36 characters',
    );
    this.validateId(id);
    this._id = id;
  }

  public toString() {
    return this.constructor.name + ' [id=' + this._id + ']';
  }
}
