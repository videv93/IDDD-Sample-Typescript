export enum BacklogItemType {
  FEATURE,
  ENHANCEMENT,
  DEFECT,
  FOUNDATION,
  INTEGRATION,
}

export function isIntegration(type: BacklogItemType) {
  return type == BacklogItemType.INTEGRATION;
}

export function isDefect(type: BacklogItemType) {
  return type == BacklogItemType.DEFECT;
}

export function isFeature(type: BacklogItemType) {
  return type == BacklogItemType.FEATURE;
}

export function isEnhancement(type: BacklogItemType) {
  return type == BacklogItemType.ENHANCEMENT;
}

export function isFoundation(type: BacklogItemType) {
  return type == BacklogItemType.FOUNDATION;
}
