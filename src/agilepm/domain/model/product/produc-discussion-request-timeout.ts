import { ProcessId } from 'src/common/domain/model/process/process-id';
import { ProcessTimedOut } from 'src/common/domain/model/process/process-timed-out';

export class ProductDiscussionRequestTimedOut extends ProcessTimedOut {
  constructor(
    tenantId: string,
    processId: ProcessId,
    totalRetriesPermitted: number,
    retryCount: number,
  ) {
    super(tenantId, processId, totalRetriesPermitted, retryCount);
  }
}
