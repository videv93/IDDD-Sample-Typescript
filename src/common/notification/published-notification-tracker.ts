import { AssertionConcern } from '..';

export class PublishedNotificationTracker extends AssertionConcern {
  private _concurrencyVersion: number;
  private _mostRecentPublishedNotificationId: number;
  private _publishedNotificationTrackerId: number;
  private _typeName: string;

  constructor(typeName: string) {
    super();

    this._typeName = typeName;
  }

  failWhenConcurrencyViolation(version: number) {
    this.assertStateTrue(
      version == this._concurrencyVersion,
      'Concurrency violation.',
    );
  }

  get mostRecentPublishedNotificationId(): number {
    return this._mostRecentPublishedNotificationId;
  }

  set mostRecentPublishedNotificationId(value: number) {
    this._mostRecentPublishedNotificationId = value;
  }

  get publishedNotificationTrackerId(): number {
    return this._publishedNotificationTrackerId;
  }

  set publishedNotificationTrackerId(value: number) {
    this._publishedNotificationTrackerId = value;
  }

  get typeName() {
    return this._typeName;
  }

  set typeName(value: string) {
    this.assertArgumentNotEmpty(value, 'The type name is required.');
    this.assertArgumentLength(
      value,
      1,
      100,
      'The type name must be 100 characters or less.',
    );
    this._typeName = value;
  }

  get concurrencyVersion(): number {
    return this._concurrencyVersion;
  }

  set concurrencyVersion(value: number) {
    this._concurrencyVersion = value;
  }
}
