import { AssertionConcern } from 'src/common';

export class EmailAddress extends AssertionConcern {
  private _address: string;

  constructor(address: string) {
    super();
    this.setAddress(address);
  }

  address(): string {
    return this._address;
  }

  setAddress(address: string): void {
    this.assertArgumentNotEmpty(address, 'The email address is required.');
    this.assertArgumentLength(
      address,
      1,
      100,
      'Email address must be 100 characters or less.',
    );
    this.assertArgumentTrue(
      address.match("\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*") !==
        null,
      'Email address format is invalid.',
    );
    this._address = address;
  }
}
