import { Server } from "http";
import { createSocketServer } from "../websocket/SocketServer";
import { FirebaseNotificacaoRepository } from "@/infra/repositories/outros/FirebaseNotificacaoRepository";
import { NotificacaoService } from "@/application/services/outros/NotificacaoService";
import { NotificacaoSocketGateway } from "@/application/services/outros/NotificacaoSocketGateway";

export function initializeNotifications(httpServer: Server) {
  const socket = createSocketServer(httpServer);
  const repository = new FirebaseNotificacaoRepository();

  const gateway = new NotificacaoSocketGateway(socket.send);
  NotificacaoService.init(gateway, repository);

  return socket;
}
