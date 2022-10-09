import { Tenant } from '../tenant/tenant';
import { CalendarEntryId } from './calendar-entry-id';

export interface CalendarEntryRepository {
  calendarEntryOfId(
    tenant: Tenant,
    calendarEntryId: CalendarEntryId,
  ): CalendarEntry;
  nextIdentity(): CalendarEntryId;
  save(calendarEntry: CalendarEntry): void;
}
