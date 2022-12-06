import { Alarm } from "src/collaboration/domain/model/calendar/alarm";
import { AlarmUnitsType } from "src/collaboration/domain/model/calendar/alarm-units-type";
import { Calendar } from "src/collaboration/domain/model/calendar/calendar";
import { CalendarEntryRepository } from "src/collaboration/domain/model/calendar/calendar-entry.repository";
import { CalendarId } from "src/collaboration/domain/model/calendar/calendar-id";
import { CalendarIdentityService } from "src/collaboration/domain/model/calendar/calendar-identity.service";
import { CalendarSharer } from "src/collaboration/domain/model/calendar/calendar-sharer";
import { CalendarRepository } from "src/collaboration/domain/model/calendar/calendar.repository";
import { RepeatType } from "src/collaboration/domain/model/calendar/repeat-type";
import { Repetition } from "src/collaboration/domain/model/calendar/repetition";
import { TimeSpan } from "src/collaboration/domain/model/calendar/time-span";
import { CollaboratorService } from "src/collaboration/domain/model/collaborator/collaborator.service";
import { Participant } from "src/collaboration/domain/model/collaborator/participant";
import { Tenant } from "src/collaboration/domain/model/tenant/tenant";
import { CalendarCommandResult } from './data/calendar-command-result';

export class CalendarApplicationService {
  private _calendarRepository: CalendarRepository;
  private _calendarEntryRepository: CalendarEntryRepository;
  private _calendarIdentityService: CalendarIdentityService;
  private _collaboratorService: CollaboratorService;

  constructor(calendarRepository: CalendarRepository, calendarEntryRepository: CalendarEntryRepository,
    calendarIdentityService: CalendarIdentityService, collaboratorService: CollaboratorService) {
    this._calendarRepository = calendarRepository;
    this._calendarEntryRepository = calendarEntryRepository;
    this._calendarIdentityService = calendarIdentityService;
    this._collaboratorService = collaboratorService;
  }

  changeCalendarDescription(tenantId: string, calendarId: string, description: string) {
    let tenant = new Tenant(tenantId);
    let calendar = this.calendarRepository.calendarOfId(tenant, new CalendarId(calendarId))
    calendar.changeDescription(description);
    this.calendarRepository.save(calendar);
  }

  createCalendar(tenantId: string, name: string, description: string, ownerId: string,
    participantsToSharedWith: Set<string>, calendarCommandResult: CalendarCommandResult) {
    let tenant = new Tenant(tenantId);
    let owner = this.collaboratorService.ownerFrom(tenant, ownerId);
    let sharers = this.sharersFrom(tenant, participantsToSharedWith);
    let calendar = new Calendar(tenant, this.calendarRepository.nextIdentity(), name,
      description, owner, sharers);
    this.calendarRepository.save(calendar);
    calendarCommandResult.resultingCalendarId(calendar.calendarId.id);
  }

  renameCalendar(tenantId: string, calendarId: string, name: string) {
    let tenant = new Tenant(tenantId);
    let calendar = this.calendarRepository.calendarOfId(tenant, new CalendarId(calendarId));
    calendar.rename(name);
    this.calendarRepository.save(calendar);
  }

  scheduleCalendarEntry(
    tenantId: string,
    calendarId: string,
    description: string,
    location: string,
    ownerId: string,
    timeSpanBegin: Date,
    timeSpanEnd: Date,
    repeatType: string,
    repeatEndOnDate: Date,
    alarmType: string,
    alarmUnits: number,
    participantsToinvite: Set<string>,
    calendarCommandResult: CalendarCommandResult
  ) {
    console.log(repeatType, repeatEndOnDate);
    console.log(alarmType);
    let tenant = new Tenant(tenantId);
    let calendar = this.calendarRepository.calendarOfId(tenant, new CalendarId(calendarId));
    let calendarEntry = calendar.scheduleCalendarEntry(
      this.calendarIdentityService,
      description,
      location,
      this.collaboratorService.ownerFrom(tenant, ownerId),
      new TimeSpan(timeSpanBegin, timeSpanEnd),
      new Repetition(RepeatType.Daily, repeatEndOnDate),
      new Alarm(AlarmUnitsType.Days, alarmUnits),
      this.inviteesFrom(tenant, participantsToinvite),
    );
    this.calendarEntryRepository.save(calendarEntry);
    calendarCommandResult.resultingCalendarId(calendarId);
    calendarCommandResult.resultingCalendarEntryId(calendarEntry.calendarEntryId.id());
  }

  sahreCalendarWith(tenantId: string, calendarId: string, participantsToSharedWith: Set<string>) {
    let tenant = new Tenant(tenantId);
    let calendar = this.calendarRepository.calendarOfId(tenant, new CalendarId(calendarId));
    for (let sharer of this.sharersFrom(tenant, participantsToSharedWith)) {
      calendar.shareCalendarWith(sharer);
    }
    this.calendarRepository.save(calendar);
  }

  unshareCalendarWith(tenantId: string, calendarId: string, participantsToUnsharedWith: Set<string>) {
    let tenant = new Tenant(tenantId);
    let calendar = this.calendarRepository.calendarOfId(tenant, new CalendarId(calendarId));
    for (let sharer of this.sharersFrom(tenant, participantsToUnsharedWith)) {
      calendar.unshareCalendarWith(sharer);
    }
    this.calendarRepository.save(calendar);
  }

  private inviteesFrom(tenant: Tenant, participants: Set<string>) {
    let invitees = new Set<Participant>();
    for (let participantId of participants) {
      let participant = this.collaboratorService.participantFrom(tenant, participantId);
      invitees.add(participant);
    }
    return invitees;
  }

  private sharersFrom(tenant: Tenant, participants: Set<string>) {
    let sharers = new Set<CalendarSharer>();

    for (let participantId of participants) {
      let participant = this.collaboratorService.participantFrom(tenant, participantId);
      sharers.add(new CalendarSharer(participant));
    }

    return sharers;

  }

  get calendarRepository() {
    return this._calendarRepository;
  }
  get calendarEntryRepository() {
    return this._calendarEntryRepository;
  }

  get calendarIdentityService() {
    return this._calendarIdentityService;
  }

  get collaboratorService() {
    return this._collaboratorService;
  }
}
