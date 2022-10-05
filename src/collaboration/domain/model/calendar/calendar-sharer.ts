import { AssertionConcern } from 'src/common';
import { Participant } from '../collaborator/participant';

export class CalendarSharer extends AssertionConcern {
  private _participant: Participant;

  constructor(participant: Participant) {
    super();
    this.setParticipant(participant);
  }

  get participant() {
    return this._participant;
  }

  setParticipant(participant: Participant) {
    this.assertArgumentNotNull(participant, 'Participant must be provided.');

    this._participant = participant;
  }
}
