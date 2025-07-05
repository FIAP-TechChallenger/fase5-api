import { Usuario } from "@/domain/entities/outros/Usuario";
import { IUsuarioRepository } from "@/domain/repositories/outros/IUsuarioRepository";

export class UsuarioConsultaService {
  constructor(private _usuarioRepo: IUsuarioRepository) {}

  async buscarTodos(): Promise<Usuario[]> {
    return this._usuarioRepo.buscarTodos();
  }

  async buscarPorId(id: string): Promise<Usuario | null> {
    return this._usuarioRepo.buscarPorId(id);
  }
}
