import { DomainEvent } from 'src/common/domain/model';
import { Participant } from '../collaborator/participant';
import { Tenant } from '../tenant/tenant';
import { CalendarEntryId } from './calendar-entry-id';
import { CalendarId } from './calendar-id';

export class CalendarEntryParticipantUninvited implements DomainEvent {
  private _calendarEntryId: CalendarEntryId;
  private _calendarId: CalendarId;
  private _eventVersion: number;
  private _occurredOn: Date;
  private _participant: Participant;
  private _tenant: Tenant;

  constructor(
    tenant: Tenant,
    calendarId: CalendarId,
    calendarEntryId: CalendarEntryId,
    participant: Participant,
  ) {
    this._calendarEntryId = calendarEntryId;
    this._calendarId = calendarId;
    this._eventVersion = 1;
    this._occurredOn = new Date();
    this._participant = participant;
    this._tenant = tenant;
  }

  get calendarEntryId() {
    return this._calendarEntryId;
  }

  get calendarId() {
    return this._calendarId;
  }

  eventVersion() {
    return this._eventVersion;
  }

  occurredOn() {
    return this._occurredOn;
  }

  get participant() {
    return this._participant;
  }

  get tenant() {
    return this._tenant;
  }
}
