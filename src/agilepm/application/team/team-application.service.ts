import { ProductOwner } from 'src/agilepm/domain/model/team/product-owner';
import { ProductOwnerRepository } from 'src/agilepm/domain/model/team/product-owner.repository';
import { TeamMember } from 'src/agilepm/domain/model/team/team-member';
import { TeamMemberRepository } from 'src/agilepm/domain/model/team/team-member.repository';
import { TenantId } from 'src/agilepm/domain/model/tenant/tenant-id';
import { ChangeTeamMemberEmailAddressCommand } from './change-team-member-email-address.command';
import { ChangeTeamMemberNameCommand } from './change-team-member-name.command';
import { EnableProductOwnerCommand } from './enable-product-owner.command';
import { EnableTeamMemberCommand } from './enable-team-member.command';

export class TeamApplicationService {
  private _productOwnerRepository: ProductOwnerRepository;
  private _teamMemberRepository: TeamMemberRepository;

  enableProductOwner(command: EnableProductOwnerCommand) {
    const tenantId = new TenantId(command.tenantId);

    try {
      let productOwner = this.productOwnerRepository.productOwnerOfIdentity(
        tenantId,
        command.username,
      );
      if (productOwner != null) {
        productOwner.enable(command.occurredOn);
      } else {
        productOwner = new ProductOwner(
          tenantId,
          command.username,
          command.firstName,
          command.lastName,
          command.emailAddress,
          command.occurredOn,
        );

        this.productOwnerRepository.save(productOwner);
      }
    } catch (error) {
      console.log(error);
    }
  }

  enableTeamMember(command: EnableTeamMemberCommand) {
    const tenantId = new TenantId(command.tenantId);

    try {
      let teamMember = this.teamMemberRepository.teamMemberOfIdentity(
        tenantId,
        command.username,
      );
      if (teamMember != null) {
        teamMember.enable(command.occurredOn);
      } else {
        teamMember = new TeamMember(
          tenantId,
          command.username,
          command.firstName,
          command.lastName,
          command.emailAddress,
          command.occurredOn,
        );
        this.teamMemberRepository.save(teamMember);
      }
    } catch (error) {
      console.log(error);
    }
  }

  changeTeamMemberEmailAddress(command: ChangeTeamMemberEmailAddressCommand) {
    const tenantId = new TenantId(command.tenantId);

    try {
      const teamMember = this.teamMemberRepository.teamMemberOfIdentity(
        tenantId,
        command.username,
      );

      if (teamMember != null) {
        teamMember.changeEmailAddress(command.emailAddress, command.occurredOn);
      }
    } catch (error) {
      console.log(error);
    }
  }

  changeTeamMemberName(command: ChangeTeamMemberNameCommand) {
    const tenantId = new TenantId(command.tenantId);
    try {
      const teamMember = this.teamMemberRepository.teamMemberOfIdentity(
        tenantId,
        command.username,
      );

      if (teamMember != null) {
        teamMember.changeName(
          command.firstName,
          command.lastName,
          command.occurredOn,
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  disableProductOwner(command: EnableProductOwnerCommand) {
    const tenantId = new TenantId(command.tenantId);
    try {
      const productOwner = this.productOwnerRepository.productOwnerOfIdentity(
        tenantId,
        command.username,
      );

      if (productOwner != null) {
        productOwner.disable(command.occurredOn);
      }
    } catch (error) {
      console.log(error);
    }
  }

  disableTeamMember(command: EnableTeamMemberCommand) {
    const tenantId = new TenantId(command.tenantId);
    try {
      const teamMember = this.teamMemberRepository.teamMemberOfIdentity(
        tenantId,
        command.username,
      );
      if (teamMember != null) {
        teamMember.disable(command.occurredOn);
        this.productOwnerRepository.save(teamMember);
      }
    } catch (error) {
      console.log(error);
    }
  }

  get productOwnerRepository(): ProductOwnerRepository {
    return this._productOwnerRepository;
  }

  get teamMemberRepository(): TeamMemberRepository {
    return this._teamMemberRepository;
  }
}
