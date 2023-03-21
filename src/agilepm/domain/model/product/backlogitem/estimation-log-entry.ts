import { Entity } from '../../entity';
import { TenantId } from '../../tenant/tenant-id';
import { TaskId } from './task-id';

export class EstimationLogEntry extends Entity {
  private _date: Date;
  private _hoursRemaining: number;
  private _taskId: TaskId;
  private _tenantId: TenantId;

  static currentLogDate() {
    // TODO: get 00:00 time
    return new Date();
  }

  protected constructor(
    tenantId: TenantId,
    taskId: TaskId,
    date: Date,
    hoursRemaining: number,
  ) {
    super();

    this.date = date;
    this.hoursRemaining = hoursRemaining;
    this.taskId = taskId;
    this.tenantId = tenantId;
  }

  get date() {
    return this._date;
  }

  set date(date: Date) {
    this._date = date;
  }

  get hoursRemaining() {
    return this._hoursRemaining;
  }

  set hoursRemaining(hoursRemaining: number) {
    this._hoursRemaining = hoursRemaining;
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
}
