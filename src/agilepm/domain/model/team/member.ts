import { Entity } from '../entity';
import { TenantId } from '../tenant/tenant-id';
import { MemberChangeTracker } from './member-change-tracker';
import { TeamMemberId } from './team-member-id';

export abstract class Member extends Entity {
  private _changeTracker: MemberChangeTracker;
  private _emailAddress: string;
  private _enabled: boolean;
  private _firstName: string;
  private _lastName: string;
  private _tenantId: TenantId;
  private _username: string;

  get teamMemberId() {
    return new TeamMemberId(this.tenantId, this.username);
  }

  constructor(
    tenantId: TenantId,
    username: string,
    firstName: string,
    lastName: string,
    emailAddress: string,
    initializedOn: Date,
  ) {
    super();

    this.emailAddress = emailAddress;
    this.firstName = firstName;
    this.lastName = lastName;
    this.tenantId = tenantId;
    this.username = username;

    this.changeTracker = new MemberChangeTracker(
      initializedOn,
      initializedOn,
      initializedOn,
    );
  }

  changeEmailAddress(emailAddress: string, date: Date) {
    if (this.changeTracker.canChangeEmailAddress(date)) {
      this.emailAddress = emailAddress;
      this.changeTracker = this.changeTracker.emailAddressChangedOn(date);
    }
  }

  changeName(firstName: string, lastName: string, date: Date) {
    if (this.changeTracker.canChangeName(date)) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.changeTracker = this.changeTracker.nameChangedOn(date);
    }
  }

  enable(date: Date) {
    if (this.changeTracker.canToggleEnabling(date)) {
      this.enabled = true;
      this.changeTracker = this.changeTracker.enablingOn(date);
    }
  }

  disable(date: Date) {
    if (this.changeTracker.canToggleEnabling(date)) {
      this.enabled = false;
      this.changeTracker = this.changeTracker.enablingOn(date);
    }
  }

  get enabled(): boolean {
    return this._enabled;
  }

  set enabled(enabled: boolean) {
    this._enabled = enabled;
  }

  get changeTracker(): MemberChangeTracker {
    return this._changeTracker;
  }

  set changeTracker(tracker: MemberChangeTracker) {
    this._changeTracker = tracker;
  }

  get emailAddress(): string {
    return this._emailAddress;
  }

  set emailAddress(emailAddress: string) {
    this.assertArgumentNotEmpty(
      emailAddress,
      'The email address must be provided.',
    );
    this.assertArgumentLength(
      emailAddress,
      1,
      100,
      'The email address must be 100 characters or less.',
    );
    this._emailAddress = emailAddress;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(firstName: string) {
    this.assertArgumentNotEmpty(firstName, 'The first name must be provided.');
    this.assertArgumentLength(
      firstName,
      1,
      50,
      'The first name must be 50 characters or less.',
    );
    this._firstName = firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(lastName: string) {
    this.assertArgumentNotEmpty(lastName, 'The last name must be provided.');
    this.assertArgumentLength(
      lastName,
      1,
      50,
      'The last name must be 100 characters or less.',
    );
    this._lastName = lastName;
  }

  get tenantId(): TenantId {
    return this._tenantId;
  }

  set tenantId(tenantId: TenantId) {
    this.assertArgumentNotNull(tenantId, 'The tenantId must be provided.');
    this._tenantId = tenantId;
  }

  get username(): string {
    return this._username;
  }

  set username(username: string) {
    this.assertArgumentNotEmpty(username, 'The username must be provided.');
    this.assertArgumentLength(
      username,
      1,
      100,
      'The username must be 100 characters or less.',
    );
    this._username = username;
  }
}
