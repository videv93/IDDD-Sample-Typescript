export class ChangeSecondaryTelephoneCommand {
  private _tenantId: string;
  private _username: string;
  private _telephone: string;

  constructor() {}

  get tenantId() {
    return this._tenantId;
  }

  get username() {
    return this._username;
  }

  get telephone() {
    return this._telephone;
  }
}
