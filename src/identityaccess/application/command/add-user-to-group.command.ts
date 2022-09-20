export class AddUserToGroupCommand {
  private _tenantId: string;
  private _groupName: string;
  private _username: string;

  constructor(tenantId: string, groupName: string, username: string) {
    this._tenantId = tenantId;
    this._groupName = groupName;
    this._username = username;
  }

  getGroupName(): string {
    return this._groupName;
  }

  setGroupName(groupName: string): void {
    this._groupName = groupName;
  }

  getTenantId(): string {
    return this._tenantId;
  }

  setTenantId(tenantId: string): void {
    this._tenantId = tenantId;
  }

  getUsername(): string {
    return this._username;
  }

  setUsername(username: string): void {
    this._username = username;
  }
}
