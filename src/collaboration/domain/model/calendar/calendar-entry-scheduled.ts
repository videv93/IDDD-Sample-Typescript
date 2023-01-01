import { DomainEvent } from 'src/common/domain/model';
import { Owner } from '../collaborator/owner';
import { Participant } from '../collaborator/participant';
import { Tenant } from '../tenant/tenant';
import { Alarm } from './alarm';
import { CalendarEntryId } from './calendar-entry-id';
import { CalendarId } from './calendar-id';
import { Repetition } from './repetition';
import { TimeSpan } from './time-span';

export class CalendarEntryScheduled implements DomainEvent {
  private _alarm: Alarm;
  private _calendarEntryId: CalendarEntryId;
  private _calendarId: CalendarId;
  private _description: string;
  private _eventVersion: number;
  private _invitees: Set<Participant>;
  private _location: string;
  private _occurredOn: Date;
  private _owner: Owner;
  private _repetition: Repetition;
  private _tenant: Tenant;
  private _timeSpan: TimeSpan;

  constructor(
    tenant: Tenant,
    calendarId: CalendarId,
    calendarEntryId: CalendarEntryId,
    description: string,
    location: string,
    owner: Owner,
    timeSpan: TimeSpan,
    repetition: Repetition,
    alarm: Alarm,
    invitees: Set<Participant>,
  ) {
    this._alarm = alarm;
    this._calendarId = calendarEntryId;
    this._calendarId = calendarId;
    this._description = description;
    this._eventVersion = 1;
    this._invitees = invitees;
    this._location = location;
    this._occurredOn = new Date();
    this._owner = owner;
    this._repetition = repetition;
    this._tenant = tenant;
    this._timeSpan = timeSpan;
  }

  get alarm() {
    return this._alarm;
  }

  get calendarEntryId() {
    return this._calendarEntryId;
  }

  get calendarId() {
    return this._calendarId;
  }

  get description() {
    return this._description;
  }

  get invitees() {
    return this._invitees;
  }

  get owner() {
    return this._owner;
  }

  get repetition() {
    return this._repetition;
  }

  eventVersion() {
    return this._eventVersion;
  }

  occurredOn() {
    return this._occurredOn;
  }

  get tenant() {
    return this._tenant;
  }

  get timeSpan() {
    return this._timeSpan;
  }

  get location() {
    return this._location;
  }
}
