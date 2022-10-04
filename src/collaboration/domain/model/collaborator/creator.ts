import { Collaborator } from './collaborator';

export class Creator extends Collaborator {
  constructor(identity: string, name: string, emailAddress: string) {
    super(identity, name, emailAddress);
  }

  hashPrimeValue(): number {
    return 43;
  }
}
