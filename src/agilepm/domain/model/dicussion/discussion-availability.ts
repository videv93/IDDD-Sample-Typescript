export enum DiscussionAvailability {
  AD_ON_NOT_ENABLED,
  FAILED,
  NOT_REQUESTED,
  REQUESTED,
  READY,
}
export function isAddOnNotAvailable(availability: DiscussionAvailability) {
  return availability == DiscussionAvailability.AD_ON_NOT_ENABLED;
}

export function isFailed(availability: DiscussionAvailability) {
  return availability == DiscussionAvailability.FAILED;
}

export function isNotRequested(availability: DiscussionAvailability) {
  return availability == DiscussionAvailability.REQUESTED;
}

export function isReady(availability: DiscussionAvailability) {
  return availability == DiscussionAvailability.READY;
}

export function isRequested(availability: DiscussionAvailability) {
  return availability == DiscussionAvailability.REQUESTED;
}
