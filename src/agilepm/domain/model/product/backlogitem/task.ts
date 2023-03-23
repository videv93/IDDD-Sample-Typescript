import { DomainEventPublisher } from 'src/common/domain/model/domain-event-publisher';
import { IllegalArgumentException } from 'src/common/illegal-argument.exception';
import { Entity } from '../../entity';
import { TeamMember } from '../../team/team-member';
import { TeamMemberId } from '../../team/team-member-id';
import { TenantId } from '../../tenant/tenant-id';
import { BacklogItemId } from './backlog-item-id';
import { EstimationLogEntry } from './estimation-log-entry';
import { TaskId } from './task-id';
import { isInProgress, TaskStatus } from './task-status';
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
    console.log('test');
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

  changeStatus(status: TaskStatus) {
    this.status = status;

    DomainEventPublisher.instance().publish(
      new TaskStatusChanged(
        this.tenantId,
        this.backlogItemId,
        this.taskId,
        this.status,
      ),
    );
  }

  describeAs(description: string) {
    this.description = description;
    DomainEventPublisher.instance().publish(
      new TaskDescribed(
        this.tenantId,
        this.backlogItemId,
        this.taskId,
        this.description,
      ),
    );
  }

  estimateHoursRemaining(hoursRemaining: number) {
    if (hoursRemaining < 0) {
      throw new IllegalArgumentException(
        'Hours remaining is illegal: ' + hoursRemaining,
      );
    }

    if (hoursRemaining != this.hoursRemaining) {
      this.hoursRemaining = hoursRemaining;

      DomainEventPublisher.instance().publish(
        new TaskHoursRemainingEstimated(
          this.tenantId,
          this.backlogItemId,
          this.taskId,
          this.hoursRemaining,
        ),
      );

      if (hoursRemaining == 0 && !isDone(this.status)) {
        this.changeStatus(TaskStatus.DONE);
      } else if (hoursRemaining > 0 && !isInProgress(this.status)) {
        this.changeStatus(TaskStatus.IN_PROGRESS);
      }
    }
  }

  rename(name: string) {
    this.name = name;

    DomainEventPublisher.instance().publish(
      new TaskRenamed(
        this.tenantId,
        this.backlogItemId,
        this.taskId,
        this.name,
      ),
    );
  }

  get backlogItemId() {
    return this._backlogItemId;
  }

  set backlogItemId(backlogItemId: BacklogItemId) {
    this._backlogItemId = backlogItemId;
  }

  get description() {
    return this._description;
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

  get name() {
    return this._name;
  }

  set name(name: string) {
    this.assertArgumentNotEmpty(name, 'Name is required');
    this.assertArgumentLength(
      name,
      1,
      100,
      'Name must be 100 chacraters or less.',
    );

    this._name = name;
  }

  get status() {
    return this._status;
  }

  set status(status: TaskStatus) {
    this.assertArgumentNotNull(status, 'Status is required');

    this._status = status;
  }

  get taskId() {
    return this._taskId;
  }

  set taskId(taskId: TaskId) {
    this.assertArgumentNotNull(taskId, 'The taskId is required.');

    this._taskId = taskId;
  }

  get tenantId() {
    return this._tenantId;
  }

  set tenantId(tenantId: TenantId) {
    this.assertArgumentNotNull(tenantId, 'The tenantId is required. ');

    this._tenantId = tenantId;
  }

  get volunteer() {
    return this._volunteer;
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

  private logEstimation(hoursRemaining: number) {
    let today = EstimationLogEntry.currentLogDate();

    let updatedLogForToday = false;
    let iterator = this.estimationLog[Symbol.iterator]();

    while (!updatedLogForToday) {
      let entry = iterator.next().value;
      updatedLogForToday = entry.updateHoursRemainingWhenDateMatches(
        hoursRemaining,
        today,
      );
    }
    if (!updatedLogForToday) {
      this.estimationLog.push(
        new EstimationLogEntry(
          this.tenantId,
          this.taskId,
          today,
          hoursRemaining,
        ),
      );
    }
  }

  get estimationLog() {
    return this._estimationLog;
  }
}
