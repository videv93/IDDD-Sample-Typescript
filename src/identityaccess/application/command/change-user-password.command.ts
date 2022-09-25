export class ChangeUserPasswordCommand {
  private _tenantId: string;
  private _username: string;
  private _currentPassword: string;
  private _changedPassword: string;

  constructor() {}

  get tenantId() {
    return this._tenantId;
  }

  get username() {
    return this._username;
  }

  get currentPassword() {
    return this._currentPassword;
  }

  get changedPassword() {
    return this._changedPassword;
  }
}
