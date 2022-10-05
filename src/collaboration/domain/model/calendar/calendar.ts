import { EventSourceRootEntity } from 'src/common/domain/model/event-source-root-entity';
import { Owner } from '../collaborator/owner';
import { Tenant } from '../tenant/tenant';
import { CalendarCreated } from './calendar-created';
import { CalendarId } from './calendar-id';
import { CalendarSharer } from './calendar-sharer';

export class Calendar extends EventSourceRootEntity {
  private _calendarId: CalendarId;
  private _desccription: string;
  private _name: string;
  private _owner: Owner;
  private sharedWith: Set<CalendarSharer>;
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
}
