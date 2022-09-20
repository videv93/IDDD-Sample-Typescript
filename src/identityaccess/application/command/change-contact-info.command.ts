export class ChangeContactInfoCommand {
  private _tenantId: string;
  private _username: string;
  private _emailAddress: string;
  private _primaryTelephone: string;
  private _secondaryTelephone: string;
  private _addressStreetAddress: string;
  private _addressCity: string;
  private _addressStateProvice: string;
  private _addressPostalCode: string;
  private _addressCountryCode: string;

  get tenantId() {
    return this._tenantId;
  }

  set tenantId(tenantId: string) {
    this._tenantId = tenantId;
  }

  get username() {
    return this._username;
  }

  set username(username: string) {
    this._username = username;
  }

  get emailAddress() {
    return this._emailAddress;
  }

  get primaryTelephone() {
    return this._primaryTelephone;
  }

  get secondaryTelephone() {
    return this._secondaryTelephone;
  }

  get addressStreetAddress() {
    return this._addressStreetAddress;
  }

  get addressCity() {
    return this._addressCity;
  }

  get addressStateProvince() {
    return this._addressStateProvice;
  }

  get addressPostalCode() {
    return this._addressPostalCode;
  }

  get addressCountryCode() {
    return this._addressCountryCode;
  }
}
