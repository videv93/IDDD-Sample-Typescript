import { Tenant } from '../tenant/tenant';
import { CalendarEntry } from './calendar-entry';
import { CalendarEntryId } from './calendar-entry-id';

export interface CalendarEntryRepository {
  calendarEntryOfId(
    tenant: Tenant,
    calendarEntryId: CalendarEntryId,
  ): CalendarEntry;
  nextIdentity(): CalendarEntryId;
  save(calendarEntry: CalendarEntry): void;
}
