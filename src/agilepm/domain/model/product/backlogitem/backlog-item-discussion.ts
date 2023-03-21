import { IllegalArgumentException } from 'src/common/illegal-argument.exception';
import { DiscussionDescriptor } from '../../dicussion/dicusion-descriptor';
import { DiscussionAvailability } from '../../dicussion/discussion-availability';
import { ValueObject } from '../../value-object';
import { isReady } from '../../dicussion/discussion-availability';

export class BacklogItemDiscussion extends ValueObject {
  private _availability: DiscussionAvailability;
  private _descriptor: DiscussionDescriptor;

  constructor(
    descriptor: DiscussionDescriptor,
    availability: DiscussionAvailability,
  ) {
    super();

    this.availability = availability;
    this.descriptor = descriptor;
  }

  static fromAvailability(availaility: DiscussionAvailability) {
    if (isReady(availaility)) {
      throw new IllegalArgumentException('Cannnot be created ready.');
    }

    const descriptor = new DiscussionDescriptor(
      DiscussionDescriptor.UNDEFINED_ID,
    );
    return new BacklogItemDiscussion(descriptor, availaility);
  }

  get availability() {
    return this._availability;
  }

  set availability(availability: DiscussionAvailability) {
    this._availability = availability;
  }

  get descriptor() {
    return this._descriptor;
  }

  set descriptor(descriptor: DiscussionDescriptor) {
    this._descriptor = descriptor;
  }
}
