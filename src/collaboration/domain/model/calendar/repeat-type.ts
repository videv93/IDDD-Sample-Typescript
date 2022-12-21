export enum RepeatType {
  DoesNotRepeat = 'DoesNotRepeat',
  Daily = 'Daily',
  Weekly = 'Weekly',
  Monthly = 'Monthly',
  Yearly = 'Yearly',
}

export function isDoesNotRepeat(repeat: RepeatType) {
  return repeat === RepeatType.DoesNotRepeat;
}

export function isDaily(repeat: RepeatType) {
  return repeat === RepeatType.Daily;
}

export function isWeekly(repeat: RepeatType) {
  return repeat === RepeatType.Weekly;
}

export function isMonthly(repeat: RepeatType) {
  return repeat === RepeatType.Monthly;
}

export function isYearly(repeat: RepeatType) {
  return repeat === RepeatType.Yearly;
}
