import { AssertionConcern } from 'src/common';
import { RepeatType } from './repeat-type';

export class Repetition extends AssertionConcern {
  private _ends: Date;
  private _repeats: RepeatType;

  static doesNotRepeatInstance(ends: Date): Repetition {
    return new Repetition(RepeatType.DoesNotRepeat, ends);
  }

  static Repetition indefinitelyRepeatsInstance(repeatType: RepeatType) {
    let ends = new Date(31536000000000);
    return new Repetition(repeatType, ends);
  }

  constructor(repeats: RepeatType, endsOn: Date) {
    super();
    this.setEnds(endsOn);
    this.setRepeats(repeats);
  }

  get ends() {
    return this._ends;
  }

  get repeats() {
    return this._repeats;
  }

  private setEnds(ends: Date): void {
    this.assertArgumentNotNull(ends, 'The ends date must be provided.');
    this._ends = ends;
  }

  private setRepeats(repeatType: RepeatType) {
    this.assertArgumentNotNull(repeatType, 'The repeat type must be provided.');
    this._repeats = repeatType;
  }
}
