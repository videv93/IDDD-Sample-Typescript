export class DeactivateTenantCommand {
  private _tenantId: string;

  constructor(tenantId: string) {
    this._tenantId = tenantId;
  }

  get tenantId() {
    return this._tenantId;
  }

  set tenantId(tenantId: string) {
    this._tenantId = tenantId;
  }
}
