import { DomainEvent } from 'src/common/domain/model';
import { TenantId } from '../../tenant/tenant-id';
import { BacklogItemId } from './backlog-item-id';
import { TaskId } from './task-id';

export class TaskVolunteerAssigned implements DomainEvent {
  private _backlogItemId: BacklogItemId;
  private _eventVersion: number;
  private _occurredOn: Date;
  private taskId: TaskId;
  private _tenantId: TenantId;
  private _volunteerMemberId: string;

  constructor(
    tenantId: TenantId,
    backlogItemId: BacklogItemId,
    taskId: TaskId,
    volunteerMemberId: string,
  ) {
    this._tenantId = tenantId;
    this._backlogItemId = backlogItemId;
    this._volunteerMemberId = volunteerMemberId;
    this._eventVersion = 1;
    this._occurredOn = new Date();
  }

  eventVersion() {
    return this._eventVersion;
  }

  occurredOn() {
    return this._occurredOn;
  }
}
