export class AddGroupToGroupCommand {
  private _tenantId: string;
  private _childGroupName: string;
  private _parentGroupName: string;

  constructor(
    tenantId: string,
    childGroupName: string,
    parentGroupName: string,
  ) {
    this._tenantId = tenantId;
    this._childGroupName = childGroupName;
    this._parentGroupName = parentGroupName;
  }

  getTenantId(): string {
    return this._tenantId;
  }

  setTenantId(tenantId: string) {
    this._tenantId = tenantId;
  }

  getChildGroupName(): string {
    return this._childGroupName;
  }

  setChildGroupName(childGroupName: string) {
    this._childGroupName = childGroupName;
  }

  getParentGroupName(): string {
    return this._parentGroupName;
  }

  setParentGroupName(parentGroupName: string): void {
    this._parentGroupName = parentGroupName;
  }
}
