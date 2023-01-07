import moment from 'moment';
import { EventSourceRootEntity } from 'src/common/domain/model/event-source-root-entity';
import { Owner } from '../collaborator/owner';
import { Participant } from '../collaborator/participant';
import { Tenant } from '../tenant/tenant';
import { Alarm } from './alarm';
import { CalendarEntryDescriptionChanged } from './calendar-entry-description-changed';
import { CalendarEntryId } from './calendar-entry-id';
import { CalendarEntryParticipantInvited } from './calendar-entry-participant-invited';
import { CalendarEntryParticipantUninvited } from './calendar-entry-participant-uninvited';
import { CalendarEntryRelocated } from './calendar-entry-relocated';
import { CalendarEntryRescheduled } from './calendar-entry-rescheduled';
import { CalendarEntryScheduled } from './calendar-entry-scheduled';
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

  /*
  constructor(eventStream: Array<DomainEvent>, streamVersion: number) {
    super(eventStream, streamVersion);
  }
  */

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
    super();
    this.assertArgumentNotNull(alarm, 'The alarm must be provided.');
    this.assertArgumentNotNull(
      calendarEntryId,
      'The calendar entry id must be provided.',
    );
    this.assertArgumentNotNull(calendarId, 'The calendar id must be provided.');
    this.assertArgumentNotEmpty(
      description,
      'The description must be provided.',
    );
    this.assertArgumentNotEmpty(location, 'The location must be provided.');
    this.assertArgumentNotNull(owner, 'The owner must be provided.');
    this.assertArgumentNotNull(repetition, 'The repetition must be provided.');
    this.assertArgumentNotNull(tenant, 'The tenant must be provided.');
    this.assertArgumentNotNull(timeSpan, 'The time span must be provided.');

    if (isDoesNotRepeat(repetition.repeats)) {
      repetition = Repetition.doesNotRepeatInstance(timeSpan.ends);
    }

    this.assertTimeSpans(repetition, timeSpan);

    if (invitees == null) {
      invitees = new Set<Participant>();
    }

    this.apply(
      new CalendarEntryScheduled(
        tenant,
        calendarId,
        calendarEntryId,
        description,
        location,
        owner,
        timeSpan,
        repetition,
        alarm,
        invitees,
      ),
    );
  }

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

  get invitees() {
    return this._invitees;
  }

  private set alarm(alarm: Alarm) {
    this._alarm = alarm;
  }

  changeDescription(description: string): void {
    if (description !== null) {
      description = description.trim();
      if (!description.length && this.description != description) {
        this.apply(
          new CalendarEntryDescriptionChanged(
            this.tenant,
            this.calendarId,
            this.calendarEntryId,
            description,
          ),
        );
      }
    }
  }

  invite(participant: Participant) {
    this.assertArgumentNotNull(
      participant,
      'The participant must be provided.',
    );

    if (!this.invitees.has(participant)) {
      this.apply(
        new CalendarEntryParticipantInvited(
          this.tenant,
          this.calendarId,
          this.calendarEntryId,
          participant,
        ),
      );
    }
  }

  relocate(location: string) {
    if (location !== null) {
      location = location.trim();
      if (location !== '' && this.location == location) {
        this.apply(
          new CalendarEntryRelocated(
            this.tenant,
            this.calendarId,
            this.calendarEntryId,
            location,
          ),
        );
      }
    }
  }

  reschedule(
    description: string,
    location: string,
    timespan: TimeSpan,
    repetition: Repetition,
    alarm: Alarm,
  ) {
    this.assertArgumentNotNull(alarm, 'The alarm must be provided.');
    this.assertArgumentNotNull(repetition, 'The repetition must be provided.');
    this.assertArgumentNotNull(timespan, 'The time span must be provided.');

    if (isDoesNotRepeat(repetition.repeats)) {
      repetition = Repetition.doesNotRepeatInstance(timespan.ends);
    }

    this.assertTimeSpans(repetition, timespan);
    this.changeDescription(description);
    this.relocate(location);
    this.apply(
      new CalendarEntryRescheduled(
        this.tenant,
        this.calendarId,
        this.calendarEntryId,
        timespan,
        repetition,
        alarm,
      ),
    );
  }

  uninvite(participant: Participant) {
    this.assertArgumentNotNull(
      participant,
      'The participant must be provided.',
    );
    if (this.invitees.has(participant)) {
      this.apply(
        new CalendarEntryParticipantUninvited(
          this.tenant,
          this.calendarId,
          this.calendarEntryId,
          participant,
        ),
      );
    }
  }

  set description(description: string) {
    this._description = description;
  }

  set location(location: string) {
    this._location = location;
  }

  set repetition(repetition: Repetition) {
    this._repetition = repetition;
  }

  set timeSpan(timeSpan: TimeSpan) {
    this._timeSpan = timeSpan;
  }

  set invitees(invitees: Set<Participant>) {
    this._invitees = invitees;
  }

  set owner(owner: Owner) {
    this._owner = owner;
  }

  set tenant(tenant: Tenant) {
    this._tenant = tenant;
  }

  set calendarEntryId(calendarEntryId: CalendarEntryId) {
    this._calendarEntryId = calendarEntryId;
  }

  set calendarId(calendarId: CalendarId) {
    this._calendarId = calendarId;
  }

  // TODO: resolve duplicate function name in typescript
  protected when(event: CalendarEntryDescriptionChanged) {
    this.description = event.description;
  }

  // TODO: resolve duplicate function name in typescript
  protected when(event: CalendarEntryParticipantInvited) {
    this.invitees.add(event.participant);
  }

  // TODO: resolve duplicate function name in typescript
  protected when(event: CalendarEntryRelocated) {
    this.location = event.location;
  }

  // TODO: resolve duplicate function name in typescript
  protected when(event: CalendarEntryRescheduled) {
    this.alarm = event.alarm;
    this.repetition = event.repetition;
    this.timeSpan = event.timeSpan;
  }

  // TODO: resolve duplicate function name in typescript
  protected when(event: CalendarEntryScheduled) {
    this.alarm = event.alarm;
    this.calendarEntryId = event.calendarEntryId;
    this.calendarId = event.calendarId;
    this.description = event.description;
    this.invitees = event.invitees;
    this.location = event.location;
    this.owner = event.owner;
    this.repetition = event.repetition;
    this.tenant = event.tenant;
    this.timeSpan = event.timeSpan;
  }

  // TODO: resolve duplicate function name in typescript
  protected when(event: CalendarEntryParticipantUninvited) {
    this.invitees.delete(event.participant);
  }

  assertTimeSpans(repetition: Repetition, timeSpan: TimeSpan) {
    if (isDoesNotRepeat(repetition.repeats)) {
      this.assertArgumentEquals(
        timeSpan.ends,
        repetition.ends,
        'Non-repeating entry must end with time span end.',
      );
    } else {
      this.assertStateFalse(
        moment(timeSpan.ends).isAfter(moment(repetition.ends)),
        'Time span must end when or before repetition ends.',
      );
    }
  }
}
