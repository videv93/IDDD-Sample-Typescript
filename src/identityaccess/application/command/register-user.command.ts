export class RegisterUserCommand {
  private _tenantId: string;
  private _invitationIdentifier: string;
  private _username: string;
  private _password: string;
  private _isEnabled: boolean;
  private _startDate: Date;
  private _endDate: Date;
  private _firstName: string;
  private _lastName: string;
  private _emailAddress: string;
  private _addressStateProvince: string;
  private _addressCity: string;
  private _addressPostalCode: string;
  private _addressCountryCode: string;
  private _primaryTelephone: string;
  private _secondaryTelephone: string;

  get tenantId() {
    return this._tenantId;
  }

  get invitationIdentifier() {
    return this._invitationIdentifier;
  }

  get username() {
    return this._username;
  }

  get password() {
    return this._password;
  }

  get isEnabled() {
    return this._isEnabled;
  }

  get startDate() {
    return this._startDate;
  }

  get endDate() {
    return this._endDate;
  }

  get firstName() {
    return this._firstName;
  }

  get lastName() {
    return this._lastName;
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
