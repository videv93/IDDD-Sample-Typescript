import { DomainEventPublisher } from 'src/common/domain/model/domain-event-publisher';
import { IllegalArgumentException } from 'src/common/illegal-argument.exception';
import { DiscussionAvailability } from '../../dicussion/discussion-availability';
import { Entity } from '../../entity';
import { TeamMember } from '../../team/team-member';
import { TenantId } from '../../tenant/tenant-id';
import { ProductId } from '../product-id';
import { ReleaseId } from '../release/release-id';
import { SprintId } from '../sprint/sprint-id';
import { BacklogItemDiscussion } from './backlog-item-discussion';
import { BacklogItemId } from './backlog-item-id';
import { BacklogItemStatus } from './backlog-item-status';
import { BacklogItemStoryPointsAssigned } from './backlog-item-story-points-assigned';
import { BacklogItemType } from './backlog-item-type';
import { BusinessPriority } from './business-priority';
import { BusinessPriorityAssigned } from './business-priority-assigned';
import { StoryPoints } from './story-point';
import { Task } from './task';
import { TaskId } from './task-id';

class BacklogItem extends Entity {
  private _associatedIssueId: string;
  private _backlogItemId: BacklogItemId;
  private _businessPriority: BusinessPriority;
  private _category: string;
  private _discussion: BacklogItemDiscussion;
  private _discussionInitiationId: string;
  private _productId: ProductId;
  private _releaseId: ReleaseId;
  private _sprintId: SprintId;
  private _status: BacklogItemStatus;
  private _story: string;
  private _storyPoints: StoryPoints;
  private _summary: string;
  private _tasks: Set<Task>;
  private _tenantId: TenantId;
  private _type: BacklogItemType;

  constructor(
    tenantId: TenantId,
    productId: ProductId,
    backlogItemId: BacklogItemId,
    summary: string,
    category: string,
    type: BacklogItemType,
    status: BacklogItemStatus,
    storyPoints: StoryPoints,
  ) {
    super();

    this.backlogItemId = backlogItemId;
    this.category = category;
    this.discussion = BacklogItemDiscussion.fromAvailability(
      DiscussionAvailability.NOT_REQUESTED,
    );
    this.productId = productId;
    this.status = status;
    this.storyPoints = storyPoints;
    this.summary = summary;
    this.tenantId = tenantId;
    this.type = type;
  }

  assignStoryPoints(storyPoints: StoryPoints) {
    this.storyPoints = storyPoints;
    DomainEventPublisher.instance().publish(
      new BacklogItemStoryPointsAssigned(
        this.tenantId,
        this.backlogItemId,
        this.storyPoints,
      ),
    );
  }

  task(taskId: TaskId) {
    for (const task of this.tasks) {
      if (task.taskId == taskId) {
        return task;
      }
    }

    return null;
  }

  assignTaskVolunteer(taskId: TaskId, volunteer: TeamMember) {
    const task = this.task(taskId);
    if (task == null) {
      throw new IllegalArgumentException('Task does not exist..');
    }

    task.assignVolunteer(volunteer);
  }

  get associatedIssueId() {
    return this._associatedIssueId;
  }

  set associatedIssueId(issueId: string) {
    this._associatedIssueId = issueId;
  }

  associatedWithIssue(issueId: string) {
    if (this.associatedIssueId == null) {
      this.associatedIssueId = issueId;
    }
  }

  get businessPriority() {
    return this._businessPriority;
  }

  set businessPriority(priority: BusinessPriority) {
    this._businessPriority = priority;
  }

  assignBusinessPriority(priority: BusinessPriority) {
    this.businessPriority = priority;

    DomainEventPublisher.instance().publish(
      new BusinessPriorityAssigned(
        this.tenantId,
        this.backlogItemId,
        this.businessPriority,
      ),
    );
  }

  taskHoursRemaining() {
    return this.totalTaskHoursRemaining() > 0;
  }

  totalTaskHoursRemaining() {
    let totalHoursRemaining = 0;
    for (const task of this.tasks) {
      totalHoursRemaining += task.hoursRemaining;
    }

    return totalHoursRemaining;
  }

  allTasks() {
    // TODO: make unmodified set
    return this.tasks;
  }

  get tasks() {
    return this._tasks;
  }

  get storyPoints() {
    return this._storyPoints;
  }

  set storyPoints(storyPoints: StoryPoints) {
    this._storyPoints = storyPoints;
  }

  set summary(summary: string) {
    this._summary = summary;
  }

  get summary() {
    return this._summary;
  }

  get tenantId() {
    return this._tenantId;
  }

  set tenantId(tenantId: TenantId) {
    this._tenantId = tenantId;
  }

  get type() {
    return this._type;
  }

  set type(type: BacklogItemType) {
    this._type = type;
  }

  get status() {
    return this._status;
  }

  set status(status: BacklogItemStatus) {
    this._status = status;
  }

  set productId(productId: ProductId) {
    this._productId = productId;
  }

  get productId() {
    return this._productId;
  }

  get discussion() {
    return this._discussion;
  }

  set discussion(discussion: BacklogItemDiscussion) {
    this._discussion = discussion;
  }

  get backlogItemId() {
    return this._backlogItemId;
  }

  set backlogItemId(backlogItemId: BacklogItemId) {
    this.assertArgumentNotNull(
      backlogItemId,
      'The backlog item id must be provided.',
    );
    this._backlogItemId = backlogItemId;
  }

  get category() {
    return this._category;
  }

  set category(category: string) {
    this._category = category;
  }
}
