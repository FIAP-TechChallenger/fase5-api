import { Server } from "http";
import { createSocketServer } from "../websocket/SocketServer";
import { FirebaseNotificacaoRepository } from "@/infra/repositories/outros/FirebaseNotificacaoRepository";
import { NotificacaoSendService } from "@/application/services/outros/notificacao/NotificacaoSendService";
import { NotificacaoSocketGateway } from "@/application/services/outros/notificacao/NotificacaoSocketGateway";

export function initializeNotifications(httpServer: Server) {
  const socket = createSocketServer(httpServer);
  const repository = new FirebaseNotificacaoRepository();

  const gateway = new NotificacaoSocketGateway(socket.send);
  NotificacaoSendService.init(gateway, repository);

  return socket;
}
