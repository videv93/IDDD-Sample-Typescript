import { EventSourceRootEntity } from 'src/common/domain/model/event-source-root-entity';
import { Owner } from '../collaborator/owner';
import { Participant } from '../collaborator/participant';
import { Alarm } from './alarm';
import { CalendarEntryId } from './calendar-entry-id';

export class CalendarEntry extends EventSourceRootEntity {
  private _alarm: Alarm;
  private _calendarEntryId: CalendarEntryId;
  private _description: string;
  private _invitees: Set<Participant>;
  private _location: string;
  private _owner: Owner;
  private _repetition: Repetition;
}
