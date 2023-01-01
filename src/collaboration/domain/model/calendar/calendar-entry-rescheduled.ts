import { DomainEvent } from 'src/common/domain/model';
import { Tenant } from '../tenant/tenant';
import { Alarm } from './alarm';
import { CalendarEntryId } from './calendar-entry-id';
import { CalendarId } from './calendar-id';
import { Repetition } from './repetition';
import { TimeSpan } from './time-span';

export class CalendarEntryRescheduled implements DomainEvent {
  private _alarm: Alarm;
  private _calendarEntryId: CalendarEntryId;
  private _calendarId: CalendarId;
  private _repetition: Repetition;
  private _tenant: Tenant;
  private _timeSpan: TimeSpan;
  private _occurredOn: Date;
  private _eventVersion: number;

  constructor(
    tenant: Tenant,
    calendarId: CalendarId,
    calendarEntryId: CalendarEntryId,
    timeSpan: TimeSpan,
    repetition: Repetition,
    alarm: Alarm,
  ) {
    this._calendarEntryId = calendarEntryId;
    this._calendarId = calendarId;
    this._eventVersion = 1;
    this._occurredOn = new Date();
    this._tenant = tenant;
    this._timeSpan = timeSpan;
    this._repetition = repetition;
    this._alarm = alarm;
  }

  get calendarEntryId() {
    return this._calendarEntryId;
  }

  get calendarId() {
    return this._calendarId;
  }

  get alarm() {
    return this._alarm;
  }

  get repetition() {
    return this._repetition;
  }

  get timeSpan() {
    return this._timeSpan;
  }

  get tenant() {
    return this._tenant;
  }

  occurredOn() {
    return this._occurredOn;
  }

  eventVersion() {
    return this._eventVersion;
  }
}
