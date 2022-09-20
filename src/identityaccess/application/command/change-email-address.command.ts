export class ChangeEmailAddressCommand {
  private _tenantId: string;
  private _username: string;
  private _emailAddress: string;

  constructor(tenantId: string, username: string, emailAddress: string) {
    this._tenantId = tenantId;
    this._username = username;
    this._emailAddress = emailAddress;
  }

  get tenantId() {
    return this._tenantId;
  }

  get username() {
    return this._username;
  }

  get emailAddress() {
    return this._emailAddress;
  }
}
