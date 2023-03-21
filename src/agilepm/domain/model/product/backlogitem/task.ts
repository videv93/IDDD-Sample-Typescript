import { Entity } from '../../entity';
import { TenantId } from '../../tenant/tenant-id';
import { BacklogItemId } from './backlog-item-id';
import { EstimationLogEntry } from './estimation-log-entry';
import { TaskId } from './task-id';
import { TaskStatus } from './task-status';

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

  get hoursRemaining() {
    return this._hoursRemaining;
  }

  get taskId() {
    return this._taskId;
  }
}
