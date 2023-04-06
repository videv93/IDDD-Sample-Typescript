import { NotificationLogId } from './notification-log.id';

export class NotificationLogInfo {
  private _logId: NotificationLogId;
  private _totalLogged: number;

  constructor(logId: NotificationLogId, totalLogged: number) {
    this._logId = logId;
    this._totalLogged = totalLogged;
  }

  get logId() {
    return this._logId;
  }

  get totalLogged() {
    return this._totalLogged;
  }
}
