import { DomainEvent } from 'src/common/domain/model';
import { TenantId } from '../../tenant/tenant-id';
import { BacklogItemId } from './backlog-item-id';
import { TaskId } from './task-id';

export class TaskDescribed implements DomainEvent {
  private _backlogItemId: BacklogItemId;
  private _description: string;
  private _eventVersion: number;
  private _occurredOn: Date;
  private _taskId: TaskId;
  private _tenantId: TenantId;

  constructor(
    tenantId: TenantId,
    backlogItemId: BacklogItemId,
    taskId: TaskId,
    description: string,
  ) {
    this._backlogItemId = backlogItemId;
    this._eventVersion = 1;
    this._occurredOn = new Date();
    this._description = description;
    this._taskId = taskId;
    this._tenantId = tenantId;
  }

  get backlogItemId() {
    return this._backlogItemId;
  }

  get description() {
    return this._description;
  }

  get taskId() {
    return this._taskId;
  }

  get tenantId() {
    return this._tenantId;
  }

  eventVersion() {
    return this._eventVersion;
  }

  occurredOn() {
    return this._occurredOn;
  }
}
