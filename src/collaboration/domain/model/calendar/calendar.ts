import { EventSourceRootEntity } from 'src/common/domain/model/event-source-root-entity';
import { Owner } from '../collaborator/owner';
import { Participant } from '../collaborator/participant';
import { Tenant } from '../tenant/tenant';
import { Alarm } from './alarm';
import { CalendarIdentityService } from './calendar-identity.service';
import { CalendarCreated } from './calendar-created';
import { CalendarDescriptionChanged } from './calendar-description-changed';
import { CalendarEntry } from './calendar-entry';
import { CalendarId } from './calendar-id';
import { CalendarRenamed } from './calendar-renamed';
import { CalendarSharer } from './calendar-sharer';
import { TimeSpan } from './time-span';
import { Repetition } from './repetition';
import { CalendarShared } from './calendar-shared';
import { CalendarUnshared } from './calendar-unshared';

export class Calendar extends EventSourceRootEntity {
  private _calendarId: CalendarId;
  private _description: string;
  private _name: string;
  private _owner: Owner;
  private _sharedWith: Set<CalendarSharer>;
  private _tenant: Tenant;

  constructor(
    tenant: Tenant,
    calendarId: CalendarId,
    name: string,
    description: string,
    owner: Owner,
    sharedWith: Set<CalendarSharer>,
  ) {
    super();
    this.assertArgumentNotNull(tenant, 'The tenant must be provided.');
    this.assertArgumentNotNull(calendarId, 'The calendar id must be provided.');
    this.assertArgumentNotEmpty(name, 'The name must be provided.');
    this.assertArgumentNotEmpty(
      description,
      'The description must be provided.',
    );
    this.assertArgumentNotNull(owner, ' the owner must be provided.');

    if (sharedWith == null) {
      sharedWith = new Set<CalendarSharer>();
    }

    this.apply(
      new CalendarCreated(
        tenant,
        calendarId,
        name,
        description,
        owner,
        sharedWith,
      ),
    );
  }

  allSharedWith() {
    return this.sharedWith;
  }

  get calendarId() {
    return this._calendarId;
  }


  get tenant() {
    return this._tenant;
  }

  get description() {
    return this._description;
  }

  get name() {
    return this._name;
  }

  get owner() {
    return this._owner;
  }

  get sharedWith() {
    return this._sharedWith;
  }

  changeDescription(description: string) {
    this.assertArgumentNotEmpty(
      description,
      'The description must be provided.',
    );
    this.apply(
      new CalendarDescriptionChanged(
        this.tenant,
        this.calendarId,
        this.name,
        description,
      ),
    );
  }

  rename(name: string): void {
    this.assertArgumentNotEmpty(name, 'The name must be provided.');
    this.apply(
      new CalendarRenamed(
        this.tenant,
        this.calendarId,
        name,
        this.description,
      ),
    );
  }

  scheduleCalendarEntry(
    calendarIdentityService: CalendarIdentityService,
    description: string,
    location: string,
    owner: Owner,
    timeSpan: TimeSpan,
    repeatition: Repetition,
    alarm: Alarm,
    invitees: Set<Participant>,
  ) {
    let calendarEntry = new CalendarEntry(
      this.tenant,
      this.calendarId,
      calendarIdentityService.nextCalendarEntryId(),
      description,
      location,
      owner,
      timeSpan,
      repeatition,
      alarm,
      invitees,
    );
    return calendarEntry;
  }

  shareCalendarWith(calendarSharer: CalendarSharer) {
    this.assertArgumentNotNull(calendarSharer, "The calendar sharer must be provided.");
    if (!this.sharedWith.has(calendarSharer)) {
      this.apply(new CalendarShared(this.tenant, this.calendarId, this.name, calendarSharer));
    }
  }

  unshareCalendarWith(calendarSharer: CalendarSharer) {
    this.assertArgumentNotNull(calendarSharer, "The calendar sharer must be provided.");
    if (this.sharedWith.has(calendarSharer)) {
      this.apply(new CalendarUnshared(this.tenant, this.calendarId, this.name, calendarSharer));
    }
  }

  set calendarId(calendarId: CalendarId) {
    this._calendarId = calendarId;
  }

  set description(description: string) {
    this._description = description;
  }

  set name(name: string) {
    this._name = name;
  }

  set owner(owner: Owner) {
    this._owner = owner;
  }

  set sharedWith(sharedWith: Set<CalendarSharer>) {
    this.sharedWith = sharedWith;
  }

  set tenant(tenant: Tenant) {
    this._tenant = tenant;
  }

  when(event: CalendarCreated) {
    this.calendarId = event.calendarId;
    this.description = event.description;
    this.name = event.name;
    this.owner = event.owner;
    this.sharedWith = event.sharedWith;
    this.tenant = event.tenant;
  }

  when(event: CalendarDescriptionChanged) {
    this.description = event.description;
  }

  when(event: CalendarRenamed) {
    this.name = event.name;
  }

  when(event: CalendarShared) {
    this.sharedWith.add(event.calendarSharer());
  }

  when(event: CalendarUnshared) {
    this.sharedWith.delete(event.calendarSharer);
  }
}
