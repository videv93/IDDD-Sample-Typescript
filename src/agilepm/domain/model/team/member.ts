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

  enable(date: Date) {
    if (this.changeTracker.canToggleEnabling(date)) {
      this.enabled = true;
      this.changeTracker = this.changeTracker.enablingOn(date);
    }
  }

  set enabled(enabled: boolean) {
    this._enabled = enabled;
  }

  set changeTracker(tracker: MemberChangeTracker) {
    this._changeTracker = tracker;
  }

  set emailAddress(emailAddress: string) {
    this._emailAddress = emailAddress;
  }

  set firstName(firstName: string) {
    this._firstName = firstName;
  }

  set lastName(lastName: string) {
    this._lastName = lastName;
  }

  set tenantId(tenantId: TenantId) {
    this._tenantId = tenantId;
  }

  set username(username: string) {
    this._username = username;
  }
}
