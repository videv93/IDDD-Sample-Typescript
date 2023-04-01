import { AbstractId } from '../abstract-id';

export class ProcessId extends AbstractId {
  static existingProcessId(value: string): ProcessId {
    return new ProcessId(value);
  }
  static newProcessId(): ProcessId {
    const processId = new ProcessId(Math.random().toString(36).substr(2, 9));
    return processId;
  }
  constructor(value: string) {
    super(value);
  }
}
