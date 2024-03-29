import { IllegalArgumentException } from 'src/common/illegal-argument.exception';
import { DiscussionDescriptor } from '../dicussion/dicusion-descriptor';
import {
  DiscussionAvailability,
  isRequested,
} from '../dicussion/discussion-availability';
import { ValueObject } from '../value-object';

import { isReady } from '../dicussion/discussion-availability';

export class ProductDiscussion extends ValueObject {
  private _availability: DiscussionAvailability;
  private _descriptor: DiscussionDescriptor;

  constructor(
    descriptor: DiscussionDescriptor,
    availability: DiscussionAvailability,
  ) {
    super();
    this.descriptor = descriptor;
    this.availability = availability;
  }

  static fromAvailability(availability: DiscussionAvailability) {
    if (isReady(availability)) {
      throw new IllegalArgumentException('Cannot be created ready.');
    }

    const descriptor = new DiscussionDescriptor(
      DiscussionDescriptor.UNDEFINED_ID,
    );
    return new ProductDiscussion(descriptor, availability);
  }

  nowReady(descriptor: DiscussionDescriptor) {
    if (descriptor == null || descriptor == undefined) {
      throw new IllegalArgumentException(
        'The discussion descriptor must be defined.',
      );
    }
    if (!isRequested(this.availability)) {
      throw new IllegalArgumentException(
        'The discussion must be requested first',
      );
    }

    return new ProductDiscussion(descriptor, DiscussionAvailability.READY);
  }

  set descriptor(descriptor: DiscussionDescriptor) {
    this.assertArgumentNotNull(descriptor, 'The descriptor must be provided.');

    this._descriptor = descriptor;
  }

  get descriptor() {
    return this._descriptor;
  }

  set availability(availability: DiscussionAvailability) {
    this.assertArgumentNotNull(
      availability,
      'The availability must be provided.',
    );

    this._availability = availability;
  }

  get availability() {
    return this._availability;
  }
}
