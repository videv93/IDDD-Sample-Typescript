import { Alarm } from 'src/collaboration/domain/model/calendar/alarm';
import { AlarmUnitsType } from 'src/collaboration/domain/model/calendar/alarm-units-type';
import { CalendarEntryId } from 'src/collaboration/domain/model/calendar/calendar-entry-id';
import { CalendarEntryRepository } from 'src/collaboration/domain/model/calendar/calendar-entry.repository';
import { RepeatType } from 'src/collaboration/domain/model/calendar/repeat-type';
import { Repetition } from 'src/collaboration/domain/model/calendar/repetition';
import { TimeSpan } from 'src/collaboration/domain/model/calendar/time-span';
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

  rescheduleCalendarEntry(
    tenantId: string,
    calendarEntryId: string,
    description: string,
    location: string,
    timeSpanBegins: Date,
    timSpanEnds: Date,
    repeatType: string,
    repeatEndsOnDate: Date,
    alarmType: string,
    anAlarmUnits: number,
  ) {
    const tenant = new Tenant(tenantId);
    const calendarEntry = this.calendarEntryRepository.calendarEntryOfId(
      tenant,
      new CalendarEntryId(calendarEntryId),
    );
    calendarEntry.reschedule(
      description,
      location,
      new TimeSpan(timeSpanBegins, timSpanEnds),
      // TODO: implement valueOf function to convert string to enum type
      new Repetition(RepeatType.valueOf(repeatType), repeatEndsOnDate),
      new Alarm(AlarmUnitsType.valueOf(alarmType), anAlarmUnits),
    );
  }

  uninviteCalendarEntryParticipant(
    tenantId: string,
    calendarEntryId: string,
    particiapntsToInvite: Set<string>,
  ) {
    let tenant = new Tenant(tenantId);
    let calendarEntry = this.calendarEntryRepository.calendarEntryOfId(
      tenant,
      new CalendarEntryId(calendarEntryId),
    );
    for (let participant of this.inviteesFrom(tenant, particiapntsToInvite)) {
      calendarEntry.uninvite(participant);
    }

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
