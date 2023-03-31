import { DiscussionAvailability } from 'src/agilepm/domain/model/dicussion/discussion-availability';

export class NewProductCommand {
  private _tenantId: string;
  private _productOwnerId: string;
  private _name: string;
  private _description: string;
  private _discussionAvailability: DiscussionAvailability;

  constructor(
    tenantId: string,
    productOwnerId: string,
    name: string,
    description: string,
    discussionAvailability: DiscussionAvailability,
  ) {
    this._tenantId = tenantId;
    this._productOwnerId = productOwnerId;
    this._name = name;
    this._description = description;
    this._discussionAvailability = discussionAvailability;
  }

  get tenantId(): string {
    return this._tenantId;
  }

  get productOwnerId(): string {
    return this._productOwnerId;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get discussionAvailability(): DiscussionAvailability {
    return this._discussionAvailability;
  }
}
