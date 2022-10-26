import { EventSourceRootEntity } from 'src/common/domain/model/event-source-root-entity';
import { Owner } from '../collaborator/owner';
import { Participant } from '../collaborator/participant';
import { Tenant } from '../tenant/tenant';
import { Alarm } from './alarm';
import { CalendarEntryId } from './calendar-entry-id';
import { CalendarId } from './calendar-id';
import { Repetition } from './repetition';
import { TimeSpan } from './time-span';

export class CalendarEntry extends EventSourceRootEntity {
  private _alarm: Alarm;
  private _calendarEntryId: CalendarEntryId;
  private _calendarId: CalendarId;
  private _description: string;
  private _invitees: Set<Participant>;
  private _location: string;
  private _owner: Owner;
  private _repetition: Repetition;
  private _tenant: Tenant;
  private _timeSpan: TimeSpan;

  get alarm() {
    return this._alarm;
  }

  get allInvitess() {
    return this._invitees;
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

  get location() {
    return this._location;
  }

  get owner() {
    return this._owner;
  }

  get repeatition() {
    return this._repetition;
  }

  get tenant() {
    return this._tenant;
  }

  get timeSpan() {
    return this._timeSpan;
  }

  changeDescription(description: string): void {
    if (description !== null) {
      description = description.trim();
      if (!description.length && this._description != description) {
        this.apply(new CalendarEntryDescriptionChanged(this.tenant, this.calendarId));
      }
    }
  }
}
