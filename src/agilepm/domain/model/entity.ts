import { AssertionConcern } from 'src/common';

export abstract class Entity extends AssertionConcern {
  private _concurrencyVersion: number;

  constructor() {
    super();
    this.concurrencyVersion = 0;
  }

  get concurrencyVersion() {
    return this._concurrencyVersion;
  }

  set concurrencyVersion(concurrencyVersion: number) {
    this._concurrencyVersion = concurrencyVersion;
  }
}
