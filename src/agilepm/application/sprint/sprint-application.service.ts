import { BacklogItemRepository } from 'src/agilepm/domain/model/product/backlogitem/backlog-item.repository';
import { SprintId } from 'src/agilepm/domain/model/product/sprint/sprint-id';
import { SprintRepository } from 'src/agilepm/domain/model/product/sprint/sprint.repository';
import { TenantId } from 'src/agilepm/domain/model/tenant/tenant-id';
import { CommitBacklogItemToSprintCommand } from './commit-backlog-item-to-sprint.command';

export class SprintApplicationService {
  private _backlogItemRepository: BacklogItemRepository;
  private _sprintRepository: SprintRepository;

  commitBacklogItemToSprint(command: CommitBacklogItemToSprintCommand): void {
    const backlogItem = this.backlogItemRepository.backlogItemOfId(
      new TenantId(command.tenantId),
      command.backlogItemId,
    );
    const sprint = this.sprintRepository.sprintOfId(
      new TenantId(command.tenantId),
      new SprintId(command.sprintId),
    );

    sprint.commit(backlogItem);

    this.sprintRepository.save(sprint);
  }

  get backlogItemRepository(): BacklogItemRepository {
    return this._backlogItemRepository;
  }

  get sprintRepository(): SprintRepository {
    return this._sprintRepository;
  }
}
