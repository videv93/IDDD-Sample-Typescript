export class DefineUserEnablementCommand {
  private _tenantId: string;
  private _username: string;
  private _isEnabled: boolean;
  private _startDate: Date;
  private _endDate: Date;

  get tenantId() {
    return this._tenantId;
  }

  get username() {
    return this._username;
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
}
