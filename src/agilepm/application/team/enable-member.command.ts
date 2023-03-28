export class EnableMemberCommand {
  private _tenantId: string;
  private _username: string;
  private _firstName: string;
  private _lastName: string;
  private _emailAddress: string;
  private _occurredOn: Date;

  get tenantId() {
    return this._tenantId;
  }

  get username() {
    return this._username;
  }

  get firstName() {
    return this._firstName;
  }

  get lastName() {
    return this._lastName;
  }

  get emailAddress() {
    return this._emailAddress;
  }

  get occurredOn() {
    return this._occurredOn;
  }
}
