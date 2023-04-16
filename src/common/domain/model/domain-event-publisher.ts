import { DomainEvent } from '.';
import { DomainEventSubscriber } from './domain-event-subscriber';

export class DomainEventPublisher {
  private static readonly _instance: DomainEventPublisher =
    new DomainEventPublisher();

  private _publishing: boolean;

  private _subscribers: Array<DomainEventSubscriber<any>>;

  public static instance(): DomainEventPublisher {
    return DomainEventPublisher._instance;
  }

  constructor() {
    this.publishing = false;
    this.ensureSubscriberList();
  }

  public publish<T>(event: T): void {
    if (!this.isPublishing() && this.hasSubscribers()) {
      try {
        this.publishing = true;
        const eventType = event.constructor.name;
        const allSubscribers: DomainEventSubscriber<T>[] = this.subscribers;
        allSubscribers.forEach(subscriber => {
          const subscribedToType = subscriber.subscribedToEventType();
          if (eventType === subscribedToType) {
            subscriber.handleEvent(event);
          }
        });
      } finally {
        this.publishing = false;
      }
    }
  }

  publishAll(domainEvents: DomainEvent[]) {
    for (const domainEvent of domainEvents) {
      this.publish(domainEvent);
    }
  }

  subscribe<T>(subscriber: DomainEventSubscriber<T>): void {
    if (!this.isPublishing()) {
      this.ensureSubscriberList();

      this.subscribers.push(subscriber);
    }
  }

  private ensureSubscriberList() {
    if (!this.hasSubscribers) {
      this.subscribers = [];
    }
  }

  isPublishing(): boolean {
    return this._publishing;
  }

  hasSubscribers(): boolean {
    return this.subscribers != null;
  }

  set publishing(flag: boolean) {
    this._publishing = flag;
  }

  get subscribers() {
    return this._subscribers;
  }

  set subscribers(subscribers: Array<DomainEventSubscriber<any>>) {
    this._subscribers = subscribers;
  }
}
