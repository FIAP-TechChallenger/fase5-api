import { Usuario } from "@/domain/entities/outros/Usuario";
import { UsuarioFirebase } from "../../models/outros/UsuarioFirebase";

export class UsuarioConverter {
  static toFirestore(data: Usuario): UsuarioFirebase {
    return {
      email: data.email,
      nome: data.nome,
      setor: data.setor,
      primeiroAcesso: data.primeiroAcesso,
    };
  }

  static fromFirestore(data: UsuarioFirebase, id: string): Usuario {
    return new Usuario({
      id,
      email: data.email,
      nome: data.nome,
      setor: data.setor,
      primeiroAcesso: data.primeiroAcesso,
    });
  }
}
