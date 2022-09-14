import { DomainEvent } from 'src/common/domain/model';
import { TenantId } from '../identity/tenant-id';

export class RoleProvisioned implements DomainEvent {
  private _eventVersion: number;
  private _occurredOn: Date;
  private _name: string;
  private _tenantId: TenantId;

  constructor(tenantId: TenantId, name: string) {
    this._eventVersion = 1;
    this._occurredOn = new Date();
    this._name = name;
    this._tenantId = tenantId;
  }

  eventVersion(): number {
    return this._eventVersion;
  }

  occurredOn(): Date {
    return this._occurredOn;
  }

  name(): string {
    return this._name;
  }

  tenantId(): TenantId {
    return this._tenantId;
  }
}
