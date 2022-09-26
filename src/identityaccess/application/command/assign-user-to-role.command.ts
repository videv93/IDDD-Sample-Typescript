export class AssignUserToRoleCommand {
  private _tenantId: string;
  private _roleName: string;
  private _username: string;

  get tenantId() {
    return this._tenantId;
  }

  get roleName() {
    return this._roleName;
  }

  get username() {
    return this._username;
  }
}
