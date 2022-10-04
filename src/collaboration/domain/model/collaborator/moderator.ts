import { Collaborator } from './collaborator';

export class Moderator extends Collaborator {
  constructor(identity: string, name: string, emailAddress: string) {
    super(identity, name, emailAddress);
  }

  hashPrimeValue() {
    return 59;
  }
}
