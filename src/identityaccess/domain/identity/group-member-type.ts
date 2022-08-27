export enum GroupMemberType {
  GROUP = 'Group',
  USER = 'User',
}

export function isGroup(type: GroupMemberType) {
  return type === GroupMemberType.USER;
}

export function isUser(type: GroupMemberType) {
  return type === GroupMemberType.USER;
}
