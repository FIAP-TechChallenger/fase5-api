import { Usuario } from "@/domain/entities/outros/Usuario";
import { UsuarioSetorEnum } from "@/domain/types/usuario.enum";

export interface IUsuarioRepository {
  buscarPorId(id: string): Promise<Usuario | null>;
  buscarTodos(): Promise<Usuario[]>;

  inserir(email: string, nome: string, setor: UsuarioSetorEnum): Promise<void>;
  gerarEmailPrimeiroAcesso(email: string): Promise<string>;
}
