import { Meta } from "@/domain/entities/comercial/Meta";

export interface MetaBuscarTodosResponseDTO {
  dados: Meta[];
  ultimoId: string;
  ultimoCriadaEm: Date;
  temMais: boolean;
}
