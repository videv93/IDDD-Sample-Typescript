import { DomainEventSubscriber } from './domain-event-subscriber';

export class DomainEventPublisher {
  private static readonly _instance: DomainEventPublisher =
    new DomainEventPublisher();

  private _publishing: boolean;

  private _subscribers: [];

  public static instance(): DomainEventPublisher {
    return DomainEventPublisher._instance;
  }

  public publish<T>(event: T): void {
    if (!this.isPublishing && this.hasSubscriber) {
      try {
        this.publishing = true;
        const eventType = event.constructor.name;
        const allSubscribers: DomainEventSubscriber<T>[] = this.subscribers;
        allSubscribers.forEach(subscriber => {
          const subscribedToType = subscriber.subscribedToEventType();
          // || subscribedToType === DomainEvent.constructor.name
          if (eventType === subscribedToType) {
            subscriber.handleEvent(event);
          }
        });
      } finally {
        this.publishing = false;
      }
    }
  }

  isPublishing(): boolean {
    return this._publishing;
  }

  set publishing(flag: boolean) {
    this._publishing = flag;
  }

  get hasSubscriber(): boolean {
    return this.subscribers != null;
  }

  get subscribers() {
    return this._subscribers;
  }
}
