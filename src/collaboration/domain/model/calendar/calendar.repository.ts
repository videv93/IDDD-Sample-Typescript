import { Tenant } from '../tenant/tenant';
import { Calendar } from './calendar';
import { CalendarId } from './calendar-id';

export interface CalendarRepository {
  calendarOfId(tenant: Tenant, calendarId: CalendarId): Calendar;
  nextIdentity(): CalendarId;
  save(calendar: Calendar): void;
}
