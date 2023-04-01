import { DisableMemberCommand } from './disable-member.command';

export class DisableProductOwnerCommand extends DisableMemberCommand {
  constructor(tenantId: string, username: string, occurredOn: Date) {
    super(tenantId, username, occurredOn);
  }
}
