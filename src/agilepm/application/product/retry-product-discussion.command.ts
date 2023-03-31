export class RetryProductDiscussionCommand {
  private _tenantId: string;
  private _processId: string;

  constructor(tenantId: string, processId: string) {
    this._tenantId = tenantId;
    this._processId = processId;
  }

  get tenantId(): string {
    return this._tenantId;
  }

  get processId(): string {
    return this._processId;
  }
}
