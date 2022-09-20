import { TelePhone } from './telephone';
import { PostalAddress } from './postal-address';
import { EmailAddress } from './email-address';
import { AssertionConcern } from 'src/common';
export class ContactInformation extends AssertionConcern {
  private _emailAddress: EmailAddress;
  private _postalAddress: PostalAddress;
  private _primaryTelephone: TelePhone;
  private _secondaryTelephone: TelePhone;

  constructor(
    emailAddress: EmailAddress,
    postalAddress: PostalAddress,
    primaryTelephone: TelePhone,
    secondaryTelephone: TelePhone,
  ) {
    super();
    this.setEmailAddress(emailAddress);
    this.setPostalAddress(postalAddress);
    this.setPrimaryTelephone(primaryTelephone);
    this.setSecondaryTelephone(secondaryTelephone);
  }

  changeEmailAddress(emailAddress: EmailAddress): ContactInformation {
    return new ContactInformation(
      emailAddress,
      this.postalAddress(),
      this.primaryTelephone(),
      this.secondaryTelephone(),
    );
  }

  changePostalAddress(postalAddress: PostalAddress): ContactInformation {
    return new ContactInformation(
      this.emailAddress(),
      postalAddress,
      this.primaryTelephone(),
      this.secondaryTelephone(),
    );
  }

  changePrimaryTelephone(telephone: TelePhone): ContactInformation {
    return new ContactInformation(
      this.emailAddress(),
      this.postalAddress(),
      telephone,
      this.secondaryTelephone(),
    );
  }

  changeSecondaryTelephone(telephone: TelePhone): ContactInformation {
    return new ContactInformation(
      this.emailAddress(),
      this.postalAddress(),
      this.primaryTelephone(),
      telephone,
    );
  }

  emailAddress(): EmailAddress {
    return this._emailAddress;
  }

  postalAddress(): PostalAddress {
    return this._postalAddress;
  }

  primaryTelephone(): TelePhone {
    return this._primaryTelephone;
  }

  secondaryTelephone(): TelePhone {
    return this._secondaryTelephone;
  }

  private setEmailAddress(emailAddress: EmailAddress): void {
    this.assertArgumentNotNull(emailAddress, 'The email address is required.');
    this._emailAddress = emailAddress;
  }

  private setPostalAddress(postalAddress: PostalAddress): void {
    this.assertArgumentNotNull(
      postalAddress,
      'The postal address sis required.',
    );
    this._postalAddress = postalAddress;
  }

  private setPrimaryTelephone(primaryTelephone: TelePhone) {
    this.assertArgumentNotNull(
      primaryTelephone,
      'The primary telephone is required.',
    );
    this._primaryTelephone = primaryTelephone;
  }

  private setSecondaryTelephone(secondaryTelephone: TelePhone) {
    this._secondaryTelephone = secondaryTelephone;
  }
}
