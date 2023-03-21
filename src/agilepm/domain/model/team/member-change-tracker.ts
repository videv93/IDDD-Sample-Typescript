export class MemberChangeTracker {
  private _emailAddressChangeOn: Date;
  private _enablingOn: Date;
  private _nameChangedOn: Date;

  constructor(
    emailAddressChangeOn: Date,
    enablingOn: Date,
    nameChangedOn: Date,
  ) {
    this._emailAddressChangeOn = emailAddressChangeOn;
    this._nameChangedOn = nameChangedOn;
    this._enablingOn = enablingOn;
  }
}
