export enum BacklogItemStatus {
  PLANNED,
  SCHEDULED,
  COMMITTED,
  DONE,
  REMOVED,
}

export function isCommitted(status: BacklogItemStatus) {
  return status == BacklogItemStatus.COMMITTED;
}

export function isPlanned(status: BacklogItemStatus) {
  return status == BacklogItemStatus.PLANNED;
}

export function isScheduled(status: BacklogItemStatus) {
  return status == BacklogItemStatus.SCHEDULED;
}

export function isDone(status: BacklogItemStatus) {
  return status == BacklogItemStatus.DONE;
}

export function isRemoved(status: BacklogItemStatus) {
  return status == BacklogItemStatus.REMOVED;
}
