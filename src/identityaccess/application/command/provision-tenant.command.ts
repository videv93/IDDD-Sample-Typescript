export class ProvisionTenantCommand {
  private _tenantName: string;
  private _tenantDescription: string;
  private _administorFirstName: string;
  private _administorLastName: string;
  private _emailAddress: string;
  private _addressStateProvince: string;
  private _addressCity: string;
  private _addressPostalCode: string;
  private _addressCountryCode: string;
  private _primaryTelephone: string;
  private _secondaryTelephone: string;

  get tenantName() {
    return this._tenantName;
  }

  get tenantDescription() {
    return this._tenantDescription;
  }

  get administorFirstName() {
    return this._administorFirstName;
  }

  get administorLastName() {
    return this._administorLastName;
  }

  get emailAddress() {
    return this._emailAddress;
  }

  get addressStateProvince() {
    return this._addressStateProvince;
  }

  get addressCity() {
    return this._addressCity;
  }

  get addressPostalCode() {
    return this._addressPostalCode;
  }

  get addressCountryCode() {
    return this._addressCountryCode;
  }

  get primaryTelephone() {
    return this._primaryTelephone;
  }

  get secondaryTelephone() {
    return this._secondaryTelephone;
  }
}
