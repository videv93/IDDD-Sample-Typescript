import { AssertionConcern } from 'src/common';

export class TelePhone extends AssertionConcern {
  private _number: string;

  constructor(number: string) {
    super();
    this.setNumber(number);
  }

  number(): string {
    return this._number;
  }

  private setNumber(number: string) {
    this.assertArgumentNotEmpty(number, 'Telephone number is required.');
    this.assertArgumentLength(
      number,
      5,
      20,
      'Telephone number may not be more than 20 characters.',
    );
    this.assertArgumentTrue(
      number.match('((\\(\\d{3}\\))|(\\d{3}-))\\d{3}-\\d{4}') !== null,
      'Telephone number or its format is invalid.',
    );
    this._number = number;
  }
}
