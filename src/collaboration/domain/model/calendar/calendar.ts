import { EventSourceRootEntity } from 'src/common/domain/model/event-source-root-entity';
import { Owner } from '../collaborator/owner';
import { Participant } from '../collaborator/participant';
import { Tenant } from '../tenant/tenant';
import { Alarm } from './alarm';
import { CalendarCreated } from './calendar-created';
import { CalendarDescriptionChanged } from './calendar-description-changed';
import { CalendarId } from './calendar-id';
import { CalendarRenamed } from './calendar-renamed';
import { CalendarSharer } from './calendar-sharer';

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
    return this.sharedWith();
  }

  calendarId() {
    return this._calendarId;
  }

  changeDescription(description: string) {
    this.assertArgumentNotEmpty(
      description,
      'The description must be provided.',
    );
    this.apply(
      new CalendarDescriptionChanged(
        this.tenant(),
        this.calendarId(),
        this.name(),
        description,
      ),
    );
  }

  tenant() {
    return this._tenant;
  }

  description() {
    return this._description;
  }

  name() {
    return this._name;
  }

  owner() {
    return this._owner;
  }

  rename(name: string): void {
    this.assertArgumentNotEmpty(name, 'The name must be provided.');
    this.apply(
      new CalendarRenamed(
        this.tenant(),
        this.calendarId(),
        name,
        this.description(),
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
      this.tenant(),
      this.calendarId(),
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

  sharedWith() {
    return this._sharedWith;
  }
}
