import { TenantId } from '../tenant/tenant-id';
import { TeamMember } from './team-member';

export interface TeamMemberRepository {
  allteamMembersOfTenant(tenantId: TenantId): TeamMember[];
  remove(teamMember: TeamMember): void;
  removeAll(teamMembers: TeamMember[]): void;
  save(teamMember: TeamMember): void;
  saveAll(teamMembers: TeamMember[]): void;
  teamMemberOfIdentity(tenantId: TenantId, username: string);
}
