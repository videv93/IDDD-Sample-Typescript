export class DisableMemberCommand {
  private _tenatId: string;
  private _username: string;
  private _occurredOn: Date;

  constructor(tenantId: string, username: string, occurredOn?: Date) {
    this._tenatId = tenantId;
    this._username = username;
    this._occurredOn = occurredOn || new Date();
  }

  get tenantId(): string {
    return this._tenatId;
  }

  get username() {
    return this._username;
  }

  get occurredOn(): Date {
    return this._occurredOn;
  }
}
