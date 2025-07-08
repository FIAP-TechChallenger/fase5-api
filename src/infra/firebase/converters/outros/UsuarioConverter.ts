import { Usuario } from "@/domain/entities/outros/Usuario";
import { UsuarioFirebase } from "../../models/outros/UsuarioFirebase";
import { getFirebaseTimeStamp } from "@/shared/utils/getFirebaseTimeStamp";

export class UsuarioConverter {
  static toFirestore(data: Usuario): UsuarioFirebase {
    return {
      email: data.email,
      nome: data.nome,
      setor: data.setor,
      primeiroAcesso: data.primeiroAcesso,
      criadaEm: getFirebaseTimeStamp(data.criadaEm),
    };
  }

  static fromFirestore(data: UsuarioFirebase, id: string): Usuario {
    return new Usuario({
      id,
      email: data.email,
      nome: data.nome,
      setor: data.setor,
      primeiroAcesso: data.primeiroAcesso,
      criadaEm: data.criadaEm.toDate(),
    });
  }
}
