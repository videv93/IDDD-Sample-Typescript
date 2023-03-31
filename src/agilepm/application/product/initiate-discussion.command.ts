export class InitiateDiscussionCommand {
  private _tenantId: string;
  private _productOwnerId: string;
  private _productId: string;
  private _discussionId: string;
  private _subject: string;

  constructor(
    tenantId: string,
    productOwnerId: string,
    productId: string,
    discussionId: string,
    subject: string,
  ) {
    this._tenantId = tenantId;
    this._productOwnerId = productOwnerId;
    this._productId = productId;
    this._discussionId = discussionId;
    this._subject = subject;
  }

  get tenantId(): string {
    return this._tenantId;
  }

  get productOwnerId(): string {
    return this._productOwnerId;
  }

  get productId(): string {
    return this._productId;
  }

  get discussionId(): string {
    return this._discussionId;
  }

  get subject(): string {
    return this._subject;
  }
}
