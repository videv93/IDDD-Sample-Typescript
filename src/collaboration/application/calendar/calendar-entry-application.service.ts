import { CalendarEntryId } from 'src/collaboration/domain/model/calendar/calendar-entry-id';
import { CalendarEntryRepository } from 'src/collaboration/domain/model/calendar/calendar-entry.repository';
import { CollaboratorService } from 'src/collaboration/domain/model/collaborator/collaborator.service';
import { Participant } from 'src/collaboration/domain/model/collaborator/participant';
import { Tenant } from 'src/collaboration/domain/model/tenant/tenant';

export class CalendarEntryApplicationService {
  private _calendarEntryRepository: CalendarEntryRepository;
  private _collaboratorService: CollaboratorService;

  constructor(
    calendarEntryRepository: CalendarEntryRepository,
    collaboratorService: CollaboratorService,
  ) {
    this._calendarEntryRepository = calendarEntryRepository;
    this._collaboratorService = collaboratorService;
  }

  changeCalendarEntryDescription(
    tenantId: string,
    calendarEntryId: string,
    description: string,
  ) {
    const tenant = new Tenant(tenantId);
    let calendarEntry = this.calendarEntryRepository.calendarEntryOfId(
      tenant,
      new CalendarEntryId(calendarEntryId),
    );
    calendarEntry.changeDescription(description);
    this.calendarEntryRepository.save(calendarEntry);
  }

  inviteCalendarEntryParticipant(
    tenantId: string,
    calendarEntryId: string,
    participantsToInvite: Set<string>,
  ) {
    const tenant = new Tenant(tenantId);
    const calendarEntry = this.calendarEntryRepository.calendarEntryOfId(
      tenant,
      new CalendarEntryId(calendarEntryId),
    );
    for (let participant of this.inviteesFrom(tenant, participantsToInvite)) {
      calendarEntry.invite(participant);
    }

    this.calendarEntryRepository.save(calendarEntry);
  }

  relocateCalendarEntry(
    tenantId: string,
    calendarEntryId: string,
    location: string,
  ) {
    const tenant = new Tenant(tenantId);
    const calendarEntry = this.calendarEntryRepository.calendarEntryOfId(
      tenant,
      new CalendarEntryId(calendarEntryId),
    );

    calendarEntry.relocate(location);
    this.calendarEntryRepository.save(calendarEntry);
  }

  get calendarEntryRepository() {
    return this._calendarEntryRepository;
  }

  get collaboratorService() {
    return this._collaboratorService;
  }

  private inviteesFrom(tenant: Tenant, participantsToInvite: Set<string>) {
    let invitees = new Set<Participant>();
    for (let participantId of participantsToInvite) {
      let participant = this.collaboratorService.participantFrom(
        tenant,
        participantId,
      );
      invitees.add(participant);
    }
    return invitees;
  }
}
