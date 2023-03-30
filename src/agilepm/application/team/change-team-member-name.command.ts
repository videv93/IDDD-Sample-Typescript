export class ChangeTeamMemberNameCommand {
  _tenantId: string;
  _username: string;
  _firstName: string;
  _lastName: string;
  _eventVersion: number;
  _occurredOn: Date;

  constructor(
    tenantId: string,
    username: string,
    firstName: string,
    lastName: string,
    occurredOn: Date,
  ) {
    this._tenantId = tenantId;
    this._username = username;
    this._firstName = firstName;
    this._lastName = lastName;
    this._occurredOn = occurredOn;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get eventVersion(): number {
    return this._eventVersion;
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
