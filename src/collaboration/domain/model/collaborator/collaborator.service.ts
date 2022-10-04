import { Tenant } from '../tenant/tenant';
import { Author } from './author';
import { Creator } from './creator';
import { Moderator } from './moderator';
import { Owner } from './owner';
import { Participant } from './participant';

export interface CollaboratorService {
  authorFrom(tenant: Tenant, identity: string): Author;
  creatorFrom(tenant: Tenant, identity: string): Creator;
  moderatorFrom(tenant: Tenant, identity: string): Moderator;
  ownerFrom(tenant: Tenant, identity: string): Owner;
  participantFrom(tenant: Tenant, identity: string): Participant;
}
