import { NotificationDTO } from "../dtos/NotificationDTO";

export class NotificationSocketGateway {
  constructor(
    private sendFn: (userId: string, notification: NotificationDTO) => void
  ) {}

  sendNotification(userId: string, notification: NotificationDTO): void {
    this.sendFn(userId, notification);
  }
}
