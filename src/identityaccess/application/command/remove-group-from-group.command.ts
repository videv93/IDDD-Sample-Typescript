export class RemoveGroupFromGroupCommand {
  private _tenantId: string;
  private _parentGroupName: string;
  private _childGroupName: string;

  get tenantId() {
    return this._tenantId;
  }

  get parentGroupName() {
    return this._parentGroupName;
  }

  get childGroupName() {
    return this._childGroupName;
  }
}
