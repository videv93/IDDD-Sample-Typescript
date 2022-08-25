import { Group } from './group';
import { GroupRepository } from './group.repository';
import { UserRepository } from './user.repository';
import { GroupMember } from './group-member';

export class GroupMemberService {
  private groupRepository: GroupRepository;
  private userRepository: UserRepository;

  constructor(
    userRepository: UserRepository,
    groupRepository: GroupRepository,
  ) {
    this.groupRepository = groupRepository;
    this.userRepository = userRepository;
  }

  isMemberGroup(group: Group, memberGroup: GroupMember): boolean {
    let isMember: boolean = false;
    for (let member of group.groupMembers()) {
      if (member.)
    }
    return false;
  }
}
