import { ProcessId } from 'src/common/domain/model/process/process-id';
import { ProcessTimedOut } from 'src/common/domain/model/process/process-timed-out';

export class ProductDiscussionRequestTimedOut extends ProcessTimedOut {
  constructor(
    aTenantId: string,
    processId: ProcessId,
    totalRetriesPermitted: number,
    retryCount: number,
  ) {
    super(aTenantId, processId, totalRetriesPermitted, retryCount);
  }
}
