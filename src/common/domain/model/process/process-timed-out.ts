import { ProcessId } from './process-id';

export class ProcessTimedOut {
  private _eventVersion: number;
  private _occuredOn: Date;
  private _processId: ProcessId;
  private _retryCount: number;
  private _tenantId: string;
  private _totalRetriesPermitted: number;

  constructor(
    tenantId: string,
    processId: ProcessId,
    totalRetriesPermitted: number,
    retryCount: number,
  ) {
    this._tenantId = tenantId;
    this._processId = processId;
    this._retryCount = retryCount;
    this._totalRetriesPermitted = totalRetriesPermitted;
  }

  get totalRetriesPermitted(): number {
    return this._totalRetriesPermitted;
  }

  get retryCount(): number {
    return this._retryCount;
  }

  get allowsRetries(): boolean {
    return this.totalRetriesPermitted > 0;
  }

  hasFullyTimedOut() {
    return this.allowsRetries || this.totalRetriesReached;
  }

  totalRetriesReached() {
    return this.retryCount >= this.totalRetriesPermitted;
  }
}
