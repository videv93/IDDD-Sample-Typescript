import { ValueObject } from '../value-object';

export class MemberChangeTracker extends ValueObject {
  private _emailAddressChangeOn: Date;
  private _enablingOn: Date;
  private _nameChangedOn: Date;

  constructor(
    emailAddressChangeOn: Date,
    enablingOn: Date,
    nameChangedOn: Date,
  ) {
    super();

    this.setEmailAddressChangeOn(emailAddressChangeOn);
    this.setNameChangedOn(nameChangedOn);
    this.setEnablingOn(enablingOn);
  }

  canChangeEmailAddress(date: Date) {
    return this._emailAddressChangeOn.getTime() < date.getTime();
  }

  canChangeName(date: Date) {
    return this._nameChangedOn.getTime() < date.getTime();
  }

  canToggleEnabling(date: Date) {
    return this._enablingOn.getTime() < date.getTime();
  }

  emailAddressChangedOn(date: Date) {
    return new MemberChangeTracker(date, this._enablingOn, this._nameChangedOn);
  }

  enablingOn(date: Date) {
    return new MemberChangeTracker(
      this._emailAddressChangeOn,
      date,
      this._nameChangedOn,
    );
  }

  nameChangedOn(date: Date) {
    return new MemberChangeTracker(
      this._emailAddressChangeOn,
      this._enablingOn,
      date,
    );
  }

  setEmailAddressChangeOn(emailAddressChangeOn: Date) {
    this.assertArgumentNotNull(
      emailAddressChangeOn,
      'The email address change date must be provided.',
    );
    this._emailAddressChangeOn = emailAddressChangeOn;
  }

  setEnablingOn(enablingOn: Date) {
    this.assertArgumentNotNull(
      enablingOn,
      'The enabling date must be provided.',
    );
    this._enablingOn = enablingOn;
  }

  setNameChangedOn(nameChangedOn: Date) {
    this.assertArgumentNotNull(
      nameChangedOn,
      'The name change date must be provided.',
    );
    this._nameChangedOn = nameChangedOn;
  }
}
