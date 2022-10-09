import { CalendarEntryId } from './calendar-entry-id';
import { CalendarEntryRepository } from './calendar-entry.repository';
import { CalendarId } from './calendar-id';
import { CalendarRepository } from './calendar.repository';

export class CalendarIdentityService {
  private _calendarRepository: CalendarRepository;
  private _calendarEntryRepository: CalendarEntryRepository;

  constructor(
    calendarRepository: CalendarRepository,
    calendarEntryRepository: CalendarEntryRepository,
  ) {
    this._calendarRepository = calendarRepository;
    this._calendarEntryRepository = calendarEntryRepository;
  }

  nextCalendarId(): CalendarId {
    return this.calendarRepository.nextIdentity();
  }

  nextCalendarEntryId(): CalendarEntryId {
    return this.calendarEntryRepository.nextIdentity();
  }

  get calendarRepository() {
    return this._calendarRepository;
  }

  get calendarEntryRepository() {
    return this._calendarEntryRepository;
  }
}
