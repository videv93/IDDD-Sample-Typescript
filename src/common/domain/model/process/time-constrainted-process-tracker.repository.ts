import { TimeConstrainedProcessTracker } from './time-constrained-process-tracker';

export interface TimeConstrainedProcessTrackerRepository {
  add(timeConstrainedProcessTracker: TimeConstrainedProcessTracker): void;
  allTimedOut(): TimeConstrainedProcessTracker[];
  allTimedOutOf(tenantId: string): TimeConstrainedProcessTracker[];
  allTracker(tenantId: string): TimeConstrainedProcessTracker[];
  save(timeConstrainedProcessTracker: TimeConstrainedProcessTracker): void;
  trackerOfProcessId(
    tenantId: string,
    processId: string,
  ): TimeConstrainedProcessTracker;
}
