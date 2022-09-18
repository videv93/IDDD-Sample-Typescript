export class ActivateTenantComand {
  private _tenantId: string;

  constructor(tenantId: string) {
    this._tenantId = tenantId;
  }

  getTenantId() {
    return this._tenantId;
  }

  setTenantId(tenantId: string) {
    this._tenantId = tenantId;
  }
}
