import { Server } from "http";
import { NotificationService } from "@/application/services/NotificationService";
import { createSocketServer } from "../websocket/SocketServer";
import { NotificationSocketGateway } from "@/application/services/NotificationSocketGateway";

export function initializeNotifications(httpServer: Server) {
  const socket = createSocketServer(httpServer);

  const gateway = new NotificationSocketGateway(socket.sendToUser);
  NotificationService.init(gateway);

  return socket;
}
