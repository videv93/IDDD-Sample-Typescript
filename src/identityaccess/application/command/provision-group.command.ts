export class ProvisionGroupCommand {
  private _tenantId: string;
  private _groupName: string;
  private _description: string;

  constructor() {}

  get tenantId() {
    return this._tenantId;
  }

  get groupName() {
    return this._groupName;
  }

  get description() {
    return this._description;
  }
}
