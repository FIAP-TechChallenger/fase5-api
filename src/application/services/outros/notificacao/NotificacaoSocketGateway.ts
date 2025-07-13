import { Notificacao } from "@/domain/entities/outros/Notificacao";

export class NotificacaoSocketGateway {
  constructor(private sendFn: (notification: Notificacao) => void) {}

  sendNotification(notification: Notificacao): void {
    this.sendFn(notification);
  }
}
