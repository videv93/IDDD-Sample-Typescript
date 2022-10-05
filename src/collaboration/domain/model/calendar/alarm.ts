import { AssertionConcern } from 'src/common';
import { AlarmUnitsType } from './alarm-units-type';

export class Alarm extends AssertionConcern {
  private _alarmUnits: number;
  private _alarmUnitsType: AlarmUnitsType;

  constructor(alarmUnitType: AlarmUnitsType, alarmUnits: number) {
    super();
    this.setAlarmUnits(alarmUnits);
    this.setAlarmUnitsType(alarmUnitType);
  }

  get alarmUnits() {
    return this._alarmUnits;
  }

  get alarmUnitsType() {
    return this._alarmUnitsType;
  }

  protected setAlarmUnits(alarmUnits: number): void {
    this._alarmUnits = alarmUnits;
  }

  protected setAlarmUnitsType(alarmUnitType: AlarmUnitsType): void {
    this._alarmUnitsType = alarmUnitType;
  }
}
