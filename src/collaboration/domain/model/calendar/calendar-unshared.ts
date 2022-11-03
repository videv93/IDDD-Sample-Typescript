import { Tenant } from "../tenant/tenant";
import { CalendarId } from "./calendar-id";
import { CalendarSharer } from "./calendar-sharer";
import { DomainEvent } from 'src/common/domain/model';

export class CalendarUnshared implements DomainEvent {
  private _calendarId: CalendarId;
  private _calendarSharer: CalendarSharer;
  private _eventVersion: number;
  private _name: string;
  private _occurredOn: Date;
  private _tenant: Tenant;

  constructor(tenant: Tenant, calendarId: CalendarId, name: string, calendarSharer: CalendarSharer) {
    this._calendarSharer = calendarSharer;
    this._eventVersion = 1;
    this._name = name;
    this._occurredOn = new Date();
    this._tenant = tenant;
  }

  get calendarId() {
    return this._calendarId;
  }

  get calendarSharer() {
    return this._calendarSharer;
  }

  get name() {
    return this._name;
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
