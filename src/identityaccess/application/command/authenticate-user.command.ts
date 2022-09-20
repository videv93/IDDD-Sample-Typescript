export class AuthenticateUserCommand {
  private _tenantId: string;
  private _username: string;
  private _password: string;

  constructor(tenantId: string, username: string, password: string) {
    this._tenantId = tenantId;
    this._username = username;
    this._password = password;
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

  getPassword(): string {
    return this._password;
  }

  setPassword(password: string): void {
    this._password = password;
  }
}
