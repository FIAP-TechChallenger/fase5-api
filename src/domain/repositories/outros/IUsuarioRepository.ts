import { UsuarioBuscarTodosDTO } from "@/application/dtos/outros/UsuarioBuscarTodosDTO";
import { UsuarioBuscarTodosResponseDTO } from "@/application/dtos/outros/UsuarioBuscarTodosResponseDTO";
import { Usuario } from "@/domain/entities/outros/Usuario";
import { UsuarioSetorEnum } from "@/domain/types/usuario.enum";

export interface IUsuarioRepository {
  buscarPorId(id: string): Promise<Usuario | null>;
  buscarTodos(
    dto: UsuarioBuscarTodosDTO
  ): Promise<UsuarioBuscarTodosResponseDTO>;

  inserir(email: string, nome: string, setor: UsuarioSetorEnum): Promise<void>;
  atualizar(usuario: Usuario): Promise<void>;
  gerarLinkRedefinirSenha(email: string): Promise<string>;
}
