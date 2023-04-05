export class NotificationLog {
  private _archived: boolean;
  private _notifications: Notification[];
  private _notificationLogId: string;
  private _nextNotificationLogId: string;
  private _previousNotificationLogId: string;

  constructor(
    notificationLogId: string,
    nextNofiicationLogId: string,
    previousNotificationLogId: string,
    notifications: Notification[],
    archived: boolean,
  ) {
    this._archived = archived;
    this._notificationLogId = notificationLogId;
    this._nextNotificationLogId = nextNofiicationLogId;
    this._previousNotificationLogId = previousNotificationLogId;
    this._notifications = notifications;
  }

  get archived() {
    return this._archived;
  }

  get notifications() {
    return this._notifications;
  }

  get notificationLogId() {
    return this._notificationLogId;
  }

  get nextNotificationLogId() {
    return this._nextNotificationLogId;
  }

  get previousNotificationLogId() {
    return this._previousNotificationLogId;
  }
}
