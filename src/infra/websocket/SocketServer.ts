import { Server } from "socket.io";
import http from "http";
import { FirebaseAuthProvider } from "../firebase/FirebaseAuthProvider";
import { Usuario } from "@/domain/entities/outros/Usuario";
import { Notificacao } from "@/domain/entities/outros/Notificacao";
import { UsuarioSetorEnum } from "@/domain/types/usuario.enum";
import { NotificacaoTipoEnum } from "@/domain/types/notificacao.enum";

interface SocketUserConnected {
  socketId: string;
  setor: UsuarioSetorEnum;
}

const connectedUsers = new Map<string, SocketUserConnected>();
const authProvider = new FirebaseAuthProvider();

export function createSocketServer(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });

  // Middleware de autenticação WS
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.query.token;

      if (!token) return next(new Error("Token não fornecido"));

      const user = await authProvider.verifyToken(token);
      if (!user?.id) return next(new Error("Token inválido"));

      socket.data.user = new Usuario(
        user.id,
        user.email || "",
        user.name,
        user.setor
      );
      next();
    } catch (error) {
      next(new Error("Autenticação WS inválida"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.data.userId;

    connectedUsers.set(userId, {
      socketId: socket.id,
      setor: socket.data.setor,
    });
    console.log(`Usuário ${userId} registrado no socket ${socket.id}`);

    socket.on("disconnect", () => {
      console.log("Desconectado:", socket.id);
      [...connectedUsers.entries()].forEach(([userId, user]) => {
        if (user.socketId === socket.id) connectedUsers.delete(userId);
      });
    });
  });

  return {
    io,
    send(notification: Notificacao) {
      switch (notification.tipo) {
        case NotificacaoTipoEnum.META_CONCLUIDA:
          [...connectedUsers.entries()].forEach(([userId, user]) => {
            if (user.setor !== UsuarioSetorEnum.PRODUCAO) {
              io.to(user.socketId).emit("notification", notification);
            }
          });
          break;
      }
    },
  };
}
