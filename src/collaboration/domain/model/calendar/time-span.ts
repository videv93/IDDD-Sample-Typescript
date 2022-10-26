export class TimeSpan extends AssertionConcern {
  private _begins: Date;
  private _ends: Date;

  constructor(begins: Date, ends: Date) {
    super();
    this.assertcorrectTimeSpan(begins, ends);
    this.setBegins(begins);
    this.setEnds(ends);
  }

  assertcorrectTimeSpan(begins: Date, ends: Date) {
    this.assertArgumentNotNull(begins, 'Must provide begins.');
    this.assertArgumentNotNull(ends, 'Must provide, ends.');
    this.assertArgumentFalse(moment(begin).after(moment(ends)), 'Time span must not end before it begin.');
  }

  get begins() {
    return this._begins;
  }

  get ends() {
    return this._ends;
  }

  private setBegins(begins: Date): void {
    this._begins = begins;
  }

  private setEnds(ends: Date): void {
    this._ends = ends;
  }
}
