import { PublishedNotificationTracker } from './published-notification-tracker';

export interface PublishedNotifiactionTrackerStore {
  publishedNotificationTracker(): PublishedNotificationTracker;

  publishedNotificationTracker(typeName: string): PublishedNotificationTracker;

  trackMostRecentPublishedNotification(
    publishedNotificationTracker: PublishedNotificationTracker,
    notifications: Notification[],
  ): void;

  typeName(): string;
}
