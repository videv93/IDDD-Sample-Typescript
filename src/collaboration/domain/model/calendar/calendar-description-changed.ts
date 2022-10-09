import { DomainEvent } from 'src/common/domain/model';
import { Tenant } from '../tenant/tenant';
import { CalendarId } from './calendar-id';

export class CalendarDescriptionChanged implements DomainEvent {
  private _calendarId: CalendarId;
  private _description: string;
  private _eventVersion: number;
  private _name: string;
  private _occurredOn: Date;
  private _tenant: Tenant;

  constructor(
    tenant: Tenant,
    calendarId: CalendarId,
    name: string,
    description: string,
  ) {
    this._calendarId = calendarId;
    this._description = description;
    this._eventVersion = 1;
    this._name = name;
    this._occurredOn = new Date();
    this._tenant = tenant;
  }

  get calendarId() {
    return this._calendarId;
  }

  get description() {
    return this._description;
  }

  eventVersion() {
    return this._eventVersion;
  }

  get name() {
    return this._name;
  }

  occurredOn() {
    return this._occurredOn;
  }

  get tenant() {
    return this._tenant;
  }
}
