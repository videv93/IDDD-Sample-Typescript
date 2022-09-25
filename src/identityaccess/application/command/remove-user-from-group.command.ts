export class RemoveUserFromGroupCommand {
  private _tenantId: string;
  private _username: string;
  private _groupName: string;

  get tenantId() {
    return this._tenantId;
  }

  get username() {
    return this._username;
  }

  get groupName() {
    return this._groupName;
  }
}
