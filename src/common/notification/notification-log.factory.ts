import { EventStore } from '../event/event-store';
import { StoredEvent } from '../event/stored-event';
import { NotificationLog } from './notification-log';
import { NotificationLogId } from './notification-log.id';
import { NotificationLogInfo } from './notification-log.info';

export class NotificationLogFactory {
  private static NOTIFICATION_PER_LOG = 20;

  private _eventStore: EventStore;

  static notificationsPerLog() {
    return NotificationLogFactory.NOTIFICATION_PER_LOG;
  }

  constructor(eventStore: EventStore) {
    this._eventStore = eventStore;
  }

  createCurrentNotificationLog() {
    return this.createNotificationLog(
      this.calculateCurrentLogId(this.eventStore),
    );
  }

  calculateCurrentLogId(eventStore: EventStore) {
    const count = eventStore.countStoredEvents();
    let remainder = count % NotificationLogFactory.NOTIFICATION_PER_LOG;
    if (remainder == 0 && count > 0) {
      remainder = NotificationLogFactory.NOTIFICATION_PER_LOG;
    }
    const low = count - remainder + 1;

    const high = low + NotificationLogFactory.NOTIFICATION_PER_LOG - 1;
    return new NotificationLogInfo(new NotificationLogId(low, high), count);
  }

  createNotificationLogById(logId: NotificationLogId) {
    const count = this.eventStore.countStoredEvents();
    const info = new NotificationLogInfo(logId, count);
    return this.createNotificationLog(info);
  }

  createNotificationLog(logInfo: NotificationLogInfo) {
    const storedEvents = this.eventStore.allStoredEventBetween(
      logInfo.logId.low,
      logInfo.logId.high,
    );

    const archivedIndicator = logInfo.logId.high < logInfo.totalLogged;
    const next = archivedIndicator
      ? logInfo.logId.next(NotificationLogFactory.NOTIFICATION_PER_LOG)
      : null;
    const previous = logInfo.logId.previous(
      NotificationLogFactory.NOTIFICATION_PER_LOG,
    );
    const notificationLog = new NotificationLog(
      logInfo.logId.encoded,
      NotificationLogId.encoded(next),
      NotificationLogId.encoded(previous),
      this.notificationsFrom(storedEvents),
      archivedIndicator,
    );
    return notificationLog;
  }

  notificationsFrom(storedEvents: StoredEvent[]) {
    const notifications = [];

    for (const storedEvent of storedEvents) {
      const domainEvent = storedEvent.toDomainEvent();

      const notification = new Notification(storedEvent.eventId(), domainEvent);
      notifications.push(notification);
    }

    return notifications;
  }

  get eventStore() {
    return this._eventStore;
  }
}
