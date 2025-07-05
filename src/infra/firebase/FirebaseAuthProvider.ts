import { Usuario } from "@/domain/entities/outros/Usuario";
import { getAuth } from "firebase-admin/auth";
import { FirebaseUsuarioRepository } from "../repositories/outros/FirebaseUsuarioRepository";
import { UsuarioConsultaService } from "@/application/services/outros/UsuarioConsultaService";

export class FirebaseAuthProvider {
  private _usuarioService = new UsuarioConsultaService(
    new FirebaseUsuarioRepository()
  );

  async verifyToken(token: string): Promise<Usuario> {
    const decoded = await getAuth().verifyIdToken(token);
    const userId = decoded.uid;

    const usuario = await this._usuarioService.buscarPorId(userId);
    if (!usuario) throw new Error("Usuário inválido");

    return usuario;
  }
}
