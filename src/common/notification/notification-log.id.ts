export class NotificationLogId {
  private _low: number;
  private _high: number;

  constructor(low: number, high: number) {
    this._low = low;
    this._high = high;
  }

  static encoded(notificationLogId: NotificationLogId): string {
    let encodedId = null;
    if (notificationLogId != null) {
      encodedId = notificationLogId.encoded;
    }
    return encodedId;
  }

  static first(notificationsPerLog: number) {
    const id = new NotificationLogId(0, 0);

    return id.next(notificationsPerLog);
  }

  next(notificationsPerLog: number) {
    const nextLow = this.high + 1;

    const nextHigh = nextLow + notificationsPerLog - 1;

    let next = new NotificationLogId(nextLow, nextHigh);
    if (this.equals(next)) {
      next = null;
    }

    return next;
  }

  previous(notificationsPerLog: number) {
    const previousLow = Math.max(this.low - notificationsPerLog, 1);

    const previousHigh = previousLow + notificationsPerLog - 1;

    const previous = new NotificationLogId(previousLow, previousHigh);

    if (this.equals(previous)) {
      return null;
    }

    return previous;
  }

  equals(other: NotificationLogId): boolean {
    return this.low === other.low && this.high === other.high;
  }

  get encoded() {
    return this.low + ',' + this.high;
  }

  get low() {
    return this._low;
  }

  get high() {
    return this._high;
  }
}
