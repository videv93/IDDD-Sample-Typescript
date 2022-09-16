import { AssertionConcern } from 'src/common';
import { TenantId } from './tenant-id';

export class InvitationDescriptor extends AssertionConcern {
  private _description: string;
  private _invitationId: string;
  private _startingOn: Date;
  private _tenantId: TenantId;
  private _until: Date;

  constructor(
    tenantId: TenantId,
    invitationId: string,
    description: string,
    startingOn: Date,
    until: Date,
  ) {
    super();
    this.setDescription(description);
    this.setInvitationId(invitationId);
    this.setStartingOn(startingOn);
    this.setTenantId(tenantId);
    this.setUntil(until);
  }

  description(): string {
    return this._description;
  }

  invitationId(): string {
    return this._invitationId;
  }

  isOpenEnded(): boolean {
    return this.startingOn() === null && this.until() === null;
  }

  startingOn(): Date {
    return this._startingOn;
  }

  until(): Date {
    return this._until;
  }

  tenantId(): TenantId {
    return this._tenantId;
  }

  setDescription(description: string): void {
    this.assertArgumentNotEmpty(
      description,
      'The invitation description is required.',
    );
    this._description = description;
  }

  setInvitationId(invitationId: string): void {
    this.assertArgumentNotEmpty(invitationId, 'The invitationId is required.');
    this._invitationId = invitationId;
  }

  setStartingOn(startingOn: Date): void {
    this._startingOn = startingOn;
  }

  setTenantId(tenantId: TenantId): void {
    this.assertArgumentNotNull(tenantId, 'The tenantId is required.');
    this._tenantId = tenantId;
  }

  setUntil(until: Date): void {
    this._until = until;
  }
}
