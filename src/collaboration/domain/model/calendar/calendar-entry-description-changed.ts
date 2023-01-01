import { DomainEvent } from 'src/common/domain/model';
import { Tenant } from '../tenant/tenant';
import { CalendarEntryId } from './calendar-entry-id';
import { CalendarId } from './calendar-id';

export class CalendarEntryDescriptionChanged implements DomainEvent {
  private _calendarEntryId: CalendarEntryId;
  private _calendarId: CalendarId;
  private _description: string;
  private _eventVersion: number;
  private _occurredOn: Date;
  private _tenant: Tenant;

  constructor(
    tenant: Tenant,
    calendarId: CalendarId,
    calendarEntryId: CalendarEntryId,
    description: string,
  ) {
    this._calendarId = calendarId;
    this._calendarEntryId = calendarEntryId;
    this._description = description;
    this._eventVersion = 1;
    this._occurredOn = new Date();
    this._tenant = tenant;
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

  get tenant() {
    return this._tenant;
  }

  eventVersion() {
    return this._eventVersion;
  }

  occurredOn() {
    return this._occurredOn;
  }
}
