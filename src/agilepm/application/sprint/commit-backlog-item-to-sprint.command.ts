export class CommitBacklogItemToSprintCommand {
  private _tenantId: string;
  private _backlogItemId: string;
  private _sprintId: string;

  constructor(tenantId: string, backlogItemId: string, sprintId: string) {
    this._tenantId = tenantId;
    this._backlogItemId = backlogItemId;
    this._sprintId = sprintId;
  }

  get tenantId(): string {
    return this._tenantId;
  }

  get backlogItemId(): string {
    return this._backlogItemId;
  }

  get sprintId(): string {
    return this._sprintId;
  }
}
