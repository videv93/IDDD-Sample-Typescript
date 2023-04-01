import { AssertionConcern } from 'src/common/assertion-concern';
import { DomainEventPublisher } from '../domain-event-publisher';
import { ProcessId } from './process-id';
import { ProcessTimedOut } from './process-timed-out';

export class TimeConstrainedProcessTracker extends AssertionConcern {
  private _allowableDuration: number;
  private _completed: boolean;
  private _concurrencyVersion: number;
  private _description: string;
  private _processId: ProcessId;
  private _processInformedOfTimeout: boolean;
  private _processTimeoutEventType: string;
  private _retryCount: number;
  private _tenantId: string;
  private _timeConstrainedProcessTrackerId: number;
  private _timeoutOccursOn: Date;
  private _totalRetriesPermitted: number;

  constructor(
    aTenantId: string,
    aProcessId: ProcessId,
    aDescription: string,
    aTimeoutOccursOn: Date,
    allowableDuration: number,
    aTotalRetriesPermitted: number,
    aProcessTimeoutEventType: string,
  ) {
    super();
    this._tenantId = aTenantId;
    this._processId = aProcessId;
    this._allowableDuration = allowableDuration;
    this._processTimeoutEventType = aProcessTimeoutEventType;
    this._description = aDescription;
    this._timeoutOccursOn = aTimeoutOccursOn;
    this._totalRetriesPermitted = aTotalRetriesPermitted;
    this._timeConstrainedProcessTrackerId = -1;
  }

  get allowableDuration(): number {
    return this._allowableDuration;
  }

  completed() {
    this._completed = true;
  }

  get isCompleted() {
    return this._completed;
  }

  get description(): string {
    return this._description;
  }

  get concurrencyVersion(): number {
    return this._concurrencyVersion;
  }

  failWhenConcurrencyViolation(version: number) {
    this.assertStateTrue(
      version == this.concurrencyVersion,
      'Concurrency Violation: Stale data detected. Entity was already modified.',
    );
  }

  get processId(): ProcessId {
    return this._processId;
  }

  isProcessInformedOfTimeout() {
    return this.processInformedOfTimeout;
  }

  set processInformedOfTimeout(value: boolean) {
    this._processInformedOfTimeout = value;
  }

  get processInformedOfTimeout(): boolean {
    return this._processInformedOfTimeout;
  }

  set timeoutOccursOn(value: Date) {
    this._timeoutOccursOn = value;
  }

  get timeoutOccursOn() {
    return this._timeoutOccursOn;
  }

  hasTimedOut() {
    const timeout = new Date(this.timeoutOccursOn);
    const now = new Date();
    return timeout.getTime() <= now.getTime();
  }

  processTimedOutEvent() {
    return new ProcessTimedOut();
  }

  incrementRetryCount() {
    this._retryCount++;
  }

  get totalRetriesPermitted() {
    return this._totalRetriesPermitted;
  }

  processTimeoutEventWithRetries() {
    return new ProcessTimedOut();
  }

  get retryCount() {
    return this._retryCount;
  }

  get totalRetriesReached() {
    return this.retryCount >= this.totalRetriesPermitted;
  }

  informProcessTimedOut() {
    if (!this.processInformedOfTimeout && this.hasTimedOut) {
      let processTimedOut = null;
      if (this.totalRetriesPermitted == 0) {
        processTimedOut = this.processTimedOutEvent();
        this.processInformedOfTimeout = true;
      } else {
        this.incrementRetryCount();

        processTimedOut = this.processTimeoutEventWithRetries();

        if (this.totalRetriesReached) {
          this.processInformedOfTimeout = true;
        } else {
          this.timeoutOccursOn = new Date(
            this.timeoutOccursOn.getTime() + this.allowableDuration,
          );
        }
      }
      DomainEventPublisher.instance().publish(processTimedOut);
    }
  }
}
