import { Usuario } from "@/domain/entities/outros/Usuario";

export interface UsuarioBuscarTodosResponseDTO {
  dados: Usuario[];
  ultimoId: string;
  temMais: boolean;
}
