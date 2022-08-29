import { ConcurrencySafeEntity } from "src/common/domain/model/concurrency-safe-entity";
import { RegistrationInvitation } from "./registration-invitation";
import { TenantId } from "./tenant-id";

export class Tenant extends ConcurrencySafeEntity {
  private _active: boolean;
  private _description: string;
  private _name: string;
  private _registrationInvitations: Set<RegistrationInvitation>;
  private _tenantId: TenantId;

  constructor(tenantId: TenantId, name: string, description: string, active: boolean) {
    super();
    this.setActive(active);
    this.setDescription(description);
    this.setName(name);
    this.setTenantId(tenantId);
  }

  protected setActive(active: boolean) {
    this._active = active;
  }

  protected setDescription(description: string) {
    this.assertArgumentNotEmpty(description, "The tenant description is required");
    this.assertArgumentLength(description, 1, 100, "The tenant description must be 100 characters or less.")

    this._description = description;
  }

  protected setName(name: string) {
    this.assertArgumentNotEmpty(name, "The tenant name is required");
    this.assertArgumentLength(name, 1, 100, "The name must be 100 characters or less.")

    this._name = name;
  }

  protected setTenantId(tenantId: TenantId) {
    this.assertArgumentNotNull(tenantId, "TenantId is required");
    this._tenantId = tenantId;
  }

}
