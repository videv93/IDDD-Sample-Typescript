import { AssertionConcern } from 'src/common';

export class Enablement extends AssertionConcern {
  private _enabled: boolean;
  private _endDate: Date;
  private _startDate: Date;

  static indefiniteEnablement(): Enablement {
    return new Enablement(true, null, null);
  }

  constructor(enabled: boolean, startDate: Date, endDate: Date) {
    super();
    if (startDate !== null || endDate !== null) {
      this.assertArgumentNotNull(startDate, 'The start date must be provided.');
      this.assertArgumentNotNull(endDate, 'The end date must be provided.');
      this.assertArgumentFalse(
        startDate.getMilliseconds() > endDate.getMilliseconds(),
        'Enablement start and/or end date is invalid.',
      );
    }
    this.setEnabled(enabled);
    this.setEndDate(endDate);
    this.setStartDate(startDate);
  }

  isEnabled(): boolean {
    return this._enabled;
  }

  isEnablementEnabled(): boolean {
    let enabled = false;
    if (this.isEnabled()) {
      if (!this.isTimeExpired()) {
        enabled = true;
      }
    }
    return enabled;
  }

  endDate(): Date {
    return this._endDate;
  }

  isTimeExpired(): boolean {
    let timeExpired = false;
    if (this.startDate() != null && this.endDate() != null) {
      const now: Date = new Date();
      if (
        now.getMilliseconds() < this.startDate().getMilliseconds() ||
        now.getMilliseconds() > this.endDate().getMilliseconds()
      ) {
        timeExpired = true;
      }
    }
    return timeExpired;
  }

  startDate(): Date {
    return this._startDate;
  }

  private setEnabled(enabled: boolean): void {
    this._enabled = enabled;
  }

  private setEndDate(endDate: Date): void {
    this._endDate = endDate;
  }

  private setStartDate(startDate: Date): void {
    this._startDate = startDate;
  }
}
