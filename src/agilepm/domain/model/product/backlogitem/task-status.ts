export enum TaskStatus {
  NOT_STARTED,
  IN_PROGRESS,
  IMPEDED,
  DONE,
}

export function isDone(status: TaskStatus) {
  return status == TaskStatus.DONE;
}

export function isImpeded(status: TaskStatus) {
  return status == TaskStatus.IMPEDED;
}

export function isInProgress(status: TaskStatus) {
  return status == TaskStatus.IN_PROGRESS;
}

export function isNotStarted(status: TaskStatus) {
  return status == TaskStatus.NOT_STARTED;
}
