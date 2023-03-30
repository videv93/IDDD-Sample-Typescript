export class ChangeTeamMemberEmailAddressCommand {
  _tenantId: string;
  _username: string;
  _emailAddress: string;
  _eventVersion: number;
  _occurredOn: Date;

  constructor(
    tenantId: string,
    username: string,
    emailAddress: string,
    occurredOn: Date,
  ) {
    this._tenantId = tenantId;
    this._username = username;
    this._emailAddress = emailAddress;
    this._occurredOn = occurredOn;
  }

  get eventVersion(): number {
    return this._eventVersion;
  }

  get emailAddress(): string {
    return this._emailAddress;
  }

  get occurredOn(): Date {
    return this._occurredOn;
  }

  get tenantId(): string {
    return this._tenantId;
  }

  get username(): string {
    return this._username;
  }
}
