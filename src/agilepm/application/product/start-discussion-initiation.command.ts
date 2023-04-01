export class StartDiscussionInitiationCommand {
  private _tenantId: string;
  private _productId: string;

  constructor(tenantId: string, productId: string) {
    this._tenantId = tenantId;
    this._productId = productId;
  }

  get tenantId(): string {
    return this._tenantId;
  }

  get productId(): string {
    return this._productId;
  }
}
