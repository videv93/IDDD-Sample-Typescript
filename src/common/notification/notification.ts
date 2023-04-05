import { AssertionConcern } from '..';
import { DomainEvent } from '../domain/model';

export class Notification extends AssertionConcern {
  private _event: DomainEvent;
  private _notificationId: number;
  private _occurredOn: Date;
  private _typeName: string;
  private _version: number;

  constructor(notificationId: number, event: DomainEvent) {
    super();
    this.event = event;
    this.notificationId = notificationId;
    this.occurredOn = new Date();
    this.typeName = event.constructor.name;
    this.version = 1;
  }

  get event(): DomainEvent {
    return this._event;
  }

  set event(value: DomainEvent) {
    this.assertArgumentNotNull(value, 'The event must be provided.');
    this._event = value;
  }

  get notificationId() {
    return this._notificationId;
  }

  set notificationId(value: number) {
    this.assertArgumentNotNull(value, 'The notificationId must be provided.');
    this._notificationId = value;
  }

  get occurredOn(): Date {
    return this._occurredOn;
  }

  set occurredOn(value: Date) {
    this._occurredOn = value;
  }

  get typeName() {
    return this._typeName;
  }

  set typeName(value: string) {
    this.assertArgumentNotNull(value, 'The typeName must be provided.');
    this.assertArgumentLength(
      value,
      1,
      100,
      'The typeName must be 100 characters or less.',
    );
    this._typeName = value;
  }

  get version() {
    return this._version;
  }

  set version(value: number) {
    this._version = value;
  }
}
