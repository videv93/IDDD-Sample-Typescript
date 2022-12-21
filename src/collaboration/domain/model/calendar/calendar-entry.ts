import { EventSourceRootEntity } from 'src/common/domain/model/event-source-root-entity';
import { Owner } from '../collaborator/owner';
import { Participant } from '../collaborator/participant';
import { Tenant } from '../tenant/tenant';
import { Alarm } from './alarm';
import { CalendarEntryId } from './calendar-entry-id';
import { CalendarId } from './calendar-id';
import { isDoesNotRepeat } from './repeat-type';
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

  relocate(location: string) {
    if (location !== null) {
      location = location.trim();
      if (location !== '' && this.location == location) {
        this.apply(new CalendarEntryRelocated(this.tenant, this.calendarId, this.calendarEntryId, location))
      }
    }
  }

  reschedule(description: string, location: string, timespan: TimeSpan, repetition: Repetition, alarm: Alarm) {
    this.assertArgumentNotNull(alarm, "The alarm must be provided.");
    this.assertArgumentNotNull(repetition, "The repetition must be provided.");
    this.assertArgumentNotNull(timespan, "The time span must be provided.");

    if (isDoesNotRepeat(repetition.repeats)) {
      repetition = Repetition.doesNotRepeatInstance(timespan.ends);
    }

    this.assertTimeSpans(repetition, timespan);
    this.changeDescription(description);
    this.relocate(location);
    this.apply(new CalendarEntryRescheduled(
      this.tenant, this.calendarId, this.calendarEntryId, timespan, repetition, alarm
    ))
  }
}
