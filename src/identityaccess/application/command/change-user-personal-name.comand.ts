export class ChangeUserPersonalNameCommand {
  private _tenantId: string;
  private _username: string;
  private _firstName: string;
  private _lastName: string;

  get tenantId() {
    return this._tenantId;
  }

  get username() {
    return this._username;
  }

  get firstName() {
    return this._firstName;
  }

  get lastName() {
    return this._lastName;
  }
}
