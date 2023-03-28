import { ProductOwner } from 'src/agilepm/domain/model/team/product-owner';
import { ProductOwnerRepository } from 'src/agilepm/domain/model/team/product-owner.repository';
import { TeamMemberRepository } from 'src/agilepm/domain/model/team/team-member.repository';
import { TenantId } from 'src/agilepm/domain/model/tenant/tenant-id';
import { EnableProductOwnerCommand } from './enable-product-owner.command';

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

  get productOwnerRepository() {
    return this._productOwnerRepository;
  }

  get teamMemberRepository() {
    return this._teamMemberRepository;
  }
}
