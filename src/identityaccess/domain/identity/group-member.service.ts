import { Group } from './group';
import { GroupRepository } from './group.repository';
import { UserRepository } from './user.repository';
import { GroupMember } from './group-member';
import { User } from './user';

export class GroupMemberService {
  private _groupRepository: GroupRepository;
  private _userRepository: UserRepository;

  constructor(
    userRepository: UserRepository,
    groupRepository: GroupRepository,
  ) {
    this._groupRepository = groupRepository;
    this._userRepository = userRepository;
  }

  groupRepository() {
    return this._groupRepository;
  }

  userRepository() {
    return this._userRepository;
  }

  isMemberGroup(group: Group, memberGroup: GroupMember): boolean {
    let isMember: boolean = false;
    for (let member of group.groupMembers()) {
      if (member.isGroup()) {
        if (memberGroup.equals(member)) {
          isMember = true;
        } else {
          let group = this.groupRepository().groupNamed(
            member.tenantId(),
            member.name(),
          );
          if (group !== null) {
            isMember = this.isMemberGroup(group, memberGroup);
          }
        }
      }
    }
    return isMember;
  }

  isUserInNestedGroup(group: Group, user: User) {
    let isInNestedGroup = false;
    for (let member of group.groupMembers()) {
      if (member.isGroup()) {
        let group = this.groupRepository().groupNamed(
          member.tenantId(),
          member.name(),
        );
        if (group !== null) {
          isInNestedGroup = group.isMember(user, this);
        }
      }
    }
    return isInNestedGroup;
  }
}
