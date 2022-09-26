export class ProvisionRoleCommand {
  private _tenantId: string;
  private _roleName: string;
  private _description: string;
  private _isSupportNesting: boolean;

  get tenantId() {
    return this._tenantId;
  }

  get roleName() {
    return this._roleName;
  }

  get description() {
    return this._description;
  }

  get isSupportNesting() {
    return this._isSupportNesting;
  }
}
