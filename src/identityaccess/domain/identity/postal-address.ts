import { AssertionConcern } from 'src/common/assertion-concern';
export class PostalAddress extends AssertionConcern {
  private _city: string;
  private _countryCode: string;
  private _postalCode: string;
  private _stateProvince: string;
  private _streetAddress: string;

  constructor(
    streetAddress: string,
    city: string,
    stateProvince: string,
    postalCode: string,
    countryCode: string,
  ) {
    super();
    this.setCity(city);
    this.setStreetAddress(streetAddress);
    this.setStateProvince(stateProvince);
    this.setPostalCode(postalCode);
    this.setCountryCode(countryCode);
  }

  private setCity(city: string): void {
    this.assertArgumentNotEmpty(city, 'The city is required.');
    this.assertArgumentLength(
      city,
      1,
      100,
      'The city must be 100 characters or less.',
    );
    this._city = city;
  }

  private setCountryCode(countryCode: string): void {
    this.assertArgumentNotEmpty(countryCode, 'The county is required');
    this.assertArgumentLength(
      countryCode,
      2,
      2,
      'The country code must be two characters.',
    );
    this._countryCode = countryCode;
  }

  private setPostalCode(postalCode: string): void {
    this.assertArgumentNotEmpty(postalCode, 'The postal code is required.');
    this.assertArgumentLength(
      postalCode,
      5,
      12,
      'The postal code must be 12 characters or less.',
    );
    this._postalCode = postalCode;
  }

  private setStateProvince(stateProvince: string): void {
    this.assertArgumentNotEmpty(
      stateProvince,
      'The state/province is required.',
    );
    this.assertArgumentLength(
      stateProvince,
      2,
      100,
      'The state/province must be 100 character or less.',
    );
    this._stateProvince = stateProvince;
  }

  private setStreetAddress(streetAddress: string) {
    this.assertArgumentNotEmpty(
      streetAddress,
      'The street address is required.',
    );
    this.assertArgumentLength(
      streetAddress,
      1,
      100,
      'The street address must be 100 characters or less.',
    );
  }
}
