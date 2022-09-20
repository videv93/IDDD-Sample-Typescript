export class ChangePostalAddressCommand {
  private _tenantId: string;
  private _username: string;
  private _addressStreetAddress: string;
  private _addressCity: string;
  private _addressStateProvince: string;
  private _addressPostalCode: string;
  private _addressCountryCode: string;

  constructor() {}

  get tenantId() {
    return this._tenantId;
  }

  get username() {
    return this._username;
  }

  get addressStreetAddress() {
    return this._addressStreetAddress;
  }

  get addressCity() {
    return this._addressCity;
  }

  get addressStateProvince() {
    return this._addressStateProvince;
  }

  get addressPostalCode() {
    return this._addressPostalCode;
  }

  get addressCountryCode() {
    return this._addressCountryCode;
  }
}
