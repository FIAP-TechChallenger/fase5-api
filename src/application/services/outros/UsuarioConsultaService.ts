import { UsuarioBuscarTodosDTO } from "@/application/dtos/outros/UsuarioBuscarTodosDTO";
import { UsuarioBuscarTodosResponseDTO } from "@/application/dtos/outros/UsuarioBuscarTodosResponseDTO";
import { Usuario } from "@/domain/entities/outros/Usuario";
import { IUsuarioRepository } from "@/domain/repositories/outros/IUsuarioRepository";

export class UsuarioConsultaService {
  constructor(private _usuarioRepo: IUsuarioRepository) {}

  async buscarTodos(
    dto: UsuarioBuscarTodosDTO
  ): Promise<UsuarioBuscarTodosResponseDTO> {
    return this._usuarioRepo.buscarTodos(dto);
  }

  async buscarPorId(id: string): Promise<Usuario | null> {
    return this._usuarioRepo.buscarPorId(id);
  }
}
