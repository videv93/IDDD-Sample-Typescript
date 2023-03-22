import { DomainEventPublisher } from 'src/common/domain/model/domain-event-publisher';
import { Entity } from '../../entity';
import { TeamMember } from '../../team/team-member';
import { TeamMemberId } from '../../team/team-member-id';
import { TenantId } from '../../tenant/tenant-id';
import { BacklogItemId } from './backlog-item-id';
import { EstimationLogEntry } from './estimation-log-entry';
import { TaskId } from './task-id';
import { TaskStatus } from './task-status';
import { TaskVolunteerAssigned } from './task-volunteer-assigned';

export class Task extends Entity {
  private _backlogItemId: BacklogItemId;
  private _description: string;
  private _estimationLog: Array<EstimationLogEntry>;
  private _hoursRemaining: number;
  private _name: string;
  private _status: TaskStatus;
  private _taskId: TaskId;
  private _tenantId: TenantId;
  private _volunteer: TeamMemberId;

  allEstimationLogEntries() {
    return this.estimationLog;
  }

  getVolunteer() {
    return this._volunteer;
  }

  constructor(
    tenantId: TenantId,
    backlogItemId: BacklogItemId,
    taskId: TaskId,
    volunteer: TeamMember,
    name: string,
    description: string,
    hoursRemaining: number,
    status: TaskStatus,
  ) {
    super();

    this.backlogItemId = backlogItemId;
    this.description = description;
    this.hoursRemaining = hoursRemaining;
    this.name = name;
    this.status = status;
    this.taskId = taskId;
    this.tenantId = tenantId;
    this.volunteer = volunteer.teamMemberId;
  }

  assignVolunteer(volunteer: TeamMember) {
    this.volunteer = volunteer.teamMemberId;

    DomainEventPublisher.instance().publish(
      new TaskVolunteerAssigned(
        this.tenantId,
        this.backlogItemId,
        this.taskId,
        this.volunteer.id,
      ),
    );
  }

  set backlogItemId(backlogItemId: BacklogItemId) {
    this._backlogItemId = backlogItemId;
  }

  set description(description: string) {
    this._description = description;
  }

  get hoursRemaining() {
    return this._hoursRemaining;
  }

  set hoursRemaining(hoursRemaining: number) {
    this._hoursRemaining = hoursRemaining;
  }

  set name(name: string) {
    this._name = name;
  }

  set status(status: TaskStatus) {
    this._status = status;
  }

  get taskId() {
    return this._taskId;
  }

  set taskId(taskId: TaskId) {
    this._taskId = taskId;
  }

  get tenantId() {
    return this._tenantId;
  }

  set tenantId(tenantId: TenantId) {
    this._tenantId = tenantId;
  }

  set volunteer(volunteer: TeamMemberId) {
    this.assertArgumentNotNull(volunteer, 'The volunteer id must be provided.');
    this.assertArgumentEquals(
      this.tenantId,
      volunteer.tenantId,
      'The volunteer must be of the same tenant.',
    );

    this._volunteer = volunteer;
  }

  get estimationLog() {
    return this._estimationLog;
  }
}
