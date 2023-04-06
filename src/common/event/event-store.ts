import { StoredEvent } from './stored-event';

export interface EventStore {
  allStoredEventBetween(
    lowStoredEventId: number,
    highStoredEventId: number,
  ): Array<StoredEvent>;
  allStoredventsSince(storedEventId: number): Array<StoredEvent>;
  append(storedEvent: StoredEvent): StoredEvent;
  close(): void;
  countStoredEvents(): number;
}
