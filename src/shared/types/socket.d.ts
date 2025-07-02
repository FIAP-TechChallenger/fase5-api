import { Usuario } from "@/domain/entities/outros/Usuario";
import "socket.io";

declare module "socket.io" {
  interface Socket {
    data: {
      user: Usuario;
    };
  }
}
