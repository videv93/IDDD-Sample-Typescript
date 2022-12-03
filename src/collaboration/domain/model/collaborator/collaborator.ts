export class Collaborator {
  private _emailAddress: string;
  private _identity: string;
  private _name: string;

  constructor(identity: string, name: string, emailAddress: string) {
    this.emailAddress = emailAddress;
    this.identity = identity;
    this.name = name;
  }

  equals(obj: Collaborator) {
    let equals = false;
    if (obj !== null && obj instanceof Collaborator) {
      equals =
        this.emailAddress === obj.emailAddress &&
        this.identity === obj.identity &&
        this.name === obj.name;
    }

    return equals;
  }

  // TODO: implement abstract function on typescript
  protected hashPrimeValue(): number {
    return 0;
  }

  get emailAddress() {
    return this._emailAddress;
  }

  get identity() {
    return this._identity;
  }

  get name() {
    return this._name;
  }

  set emailAddress(emailAddress: string) {
    this._emailAddress = emailAddress;
  }

  set identity(identity: string) {
    this._identity = identity;
  }

  set name(name: string) {
    this._name = name;
  }
}
