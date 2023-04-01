export class TimeOutProductdiscussionRequestCommand {
  private _tenantId: string;
  private _processId: string;
  private _itmedOutDate: Date;

  constructor(tenantId: string, processId: string, itmedOutDate: Date) {
    this._tenantId = tenantId;
    this._processId = processId;
    this._itmedOutDate = itmedOutDate;
  }

  get tenantId(): string {
    return this._tenantId;
  }

  get processId(): string {
    return this._processId;
  }

  get timedOutDate(): Date {
    return this._itmedOutDate;
  }
}
