import { Tenant } from "src/identityaccess/domain/identity/tenant";
import { TenantId } from "src/identityaccess/domain/identity/tenant-id";
import { ValudeObject } from "../value-object";

export class ProductOwnerId extends ValudeObject {
  private _id: string;
  private _tenantId: TenantId;

  constructor(tenantId: TenantId, id: string) {
    super();

    this.id = id;
    this.tenantId = tenantId;
  }

  get id() {
    return this._id;
  }

  get tenantId() {
    return this._tenantId;
  }

  set id(id: string) {
    this.assertArgumentNotEmpty(id, 'The id must be provided.');
    this.assertArgumentLength(id, 0, 36, 'The id must be 36 characters or less.');

    this._id = id;
  }

  set tenantId(tenantId: TenantId) {
    this.assertArgumentNotNull(tenantId, 'The tenantId must be provided.')

    this._tenantId = tenantId;
  }
}
