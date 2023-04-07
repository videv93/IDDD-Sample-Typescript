export interface NotifiactionPublisher {
  publishNotifications(): void;
  internalOnlyTestConfirmation(): boolean;
}
