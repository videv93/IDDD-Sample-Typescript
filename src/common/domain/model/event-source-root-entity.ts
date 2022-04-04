import { IllegalArgumentException } from 'src/common/illegal-argument.exception';
import { AssertionConcern } from '../../assertion-concern';
import { DomainEvent } from './domain-event';

export abstract class EventSourceRootEntity extends AssertionConcern {
  private static readonly MUTATOR_METHOD_NAME = 'when';
  private static mutatorMethods: Map<string, Function> = new Map<
    string,
    Function
  >();
  private _mutatingEvents: Array<DomainEvent>;
  private _unmutatedVersion: number;

  mutateVersion(): number {
    return this.unmutatedVersion() + 1;
  }

  mutatingEvents(): Array<DomainEvent> {
    return this._mutatingEvents;
  }

  unmutatedVersion(): number {
    return this._unmutatedVersion;
  }

  protected constructor(
    eventStream: Array<DomainEvent>,
    streamVersion: number,
  ) {
    super();
    for (const event of eventStream) {
      this.mutateWhen(event);
    }
    this.setUnmutatedVersion(streamVersion);
  }

  protected mutateWhen(event: DomainEvent): void {
    const rootType = this.constructor.name;
    const eventType = event.constructor.name;
    const key: string = rootType + ':' + eventType;
    let mutatorMethod: Function = EventSourceRootEntity.mutatorMethods.get(key);

    if (mutatorMethod === null) {
      mutatorMethod = this.cacheMutatorMethodFor(key, rootType, eventType);
    }
  }

  private cacheMutatorMethodFor(
    key: string,
    rootType: string,
    eventType: string,
  ): Function {
    try {
      const method: Function = this.hiddenOrPublicMethod(rootType, eventType);
      // method.setAccessible(true);
      EventSourceRootEntity.mutatorMethods.set(key, method);
      return method;
    } catch (e) {
      throw new IllegalArgumentException(
        'I do not understand ' +
          EventSourceRootEntity.MUTATOR_METHOD_NAME +
          '(' +
          eventType +
          ') because: ' +
          e.constructor.name +
          '>>>' +
          (e as Error).message,
      );
    }
  }

  private hiddenOrPublicMethod(rootType: string, eventType: string): Function {
    const method: Function = null;
    try {
      // method = rootType;
    } catch (e) {
      // method = rootType
    }
    return method;
  }

  private setMutatingEvents(mutatingEvents: Array<DomainEvent>): void {
    this._mutatingEvents = mutatingEvents;
  }

  private setUnmutatedVersion(streamVersion: number) {
    this._unmutatedVersion = streamVersion;
  }
}
