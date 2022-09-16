import { ConcurrencySafeEntity } from 'src/common/domain/model/concurrency-safe-entity';
import { IllegalArgumentException } from 'src/common/illegal-argument.exception';
import { InvitationDescriptor } from './invitation-descriptor';
import { TenantId } from './tenant-id';

export class RegistrationInvitation extends ConcurrencySafeEntity {
  private _description: string;
  private _invitationId: string;
  private _startingOn: Date;
  private _tenantId: TenantId;
  private _until: Date;

  description() {
    return this._description;
  }

  invitationId() {
    return this._invitationId;
  }

  until() {
    return this._until;
  }

  startingOn() {
    return this._startingOn;
  }

  tenantId(): TenantId {
    return this._tenantId;
  }

  isAvailable(): boolean {
    let isAvailable = false;
    if (this.startingOn() == null && this.until() == null) {
      isAvailable = true;
    } else {
      let time = new Date().getTime();
      if (
        time >= this.startingOn().getTime() &&
        time <= this.until().getTime()
      ) {
        isAvailable = true;
      }
    }
    return isAvailable;
  }

  isIdentifiedBy(identifier: string) {
    let isIdentified = this.invitationId() === identifier;
    if (!isIdentified && this.description() != null) {
      isIdentified = this.description() === identifier;
    }
    return isIdentified;
  }

  constructor(tenantId: TenantId, invitationId: string, description: string) {
    super();
    this.setDescription(description);
    this.setInvitationId(invitationId);
    this.setTenantId(tenantId);

    this.assertValidInvitationDates();
  }

  openEnded(): RegistrationInvitation {
    this.setStartingOn(null);
    this.setUntil(null);
    return this;
  }

  redefineAs(): RegistrationInvitation {
    this.setStartingOn(null);
    this.setUntil(null);
    return this;
  }

  startingOnn(date: Date): RegistrationInvitation {
    if (this.until() !== null) {
      throw new IllegalArgumentException(
        'Cannot set starting-on date after until date.',
      );
    }

    this.setStartingOn(date);

    this.setUntil(new Date(date.getTime() + 86400000));

    return this;
  }

  untill(date: Date): RegistrationInvitation {
    if (this.startingOn() === null) {
      throw new IllegalArgumentException(
        'Cannot set until date before setting starting-on date.',
      );
    }
    this.setUntil(date);
    return this;
  }

  protected assertValidInvitationDates() {
    if (this.startingOn() === null && this.until() === null) {
    } else if (
      this.startingOn() === null ||
      (this.until() === null && this.startingOn() !== this.until())
    ) {
      throw new IllegalArgumentException(
        'This is an invalid open-ended invitation.',
      );
    } else if (this.startingOn().getTime() - this.until().getTime() > 0) {
      throw new IllegalArgumentException(
        'The starting date and time must be before the until date and time.',
      );
    }
  }

  protected setDescription(description: string) {
    this.assertArgumentNotEmpty(
      description,
      'The invitation description is required.',
    );
    this.assertArgumentLength(
      description,
      1,
      100,
      'The invitation description must be 100 characters or less.',
    );

    this._description = description;
  }

  protected setInvitationId(invitationId: string) {
    this.assertArgumentNotEmpty(invitationId, 'The invitationId is required.');
    this.assertArgumentLength(
      invitationId,
      1,
      36,
      'The invitation id must be 36 characters or less.',
    );

    this._invitationId = invitationId;
  }

  protected setStartingOn(startingOn: Date) {
    this._startingOn = startingOn;
  }

  protected setTenantId(tenantId: TenantId) {
    this.assertArgumentNotNull(tenantId, 'The tenantId is required');

    this._tenantId = tenantId;
  }

  protected setUntil(until: Date) {
    this._until = until;
  }

  toDescriptor(): InvitationDescriptor {
    return new InvitationDescriptor(
      this.tenantId(),
      this.invitationId(),
      this.description(),
      this.startingOn(),
      this.until(),
    );
  }
}
