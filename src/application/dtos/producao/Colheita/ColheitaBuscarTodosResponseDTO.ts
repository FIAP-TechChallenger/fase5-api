import { Colheita } from "@/domain/entities/producao/Colheita";

export interface ColheitaBuscarTodosResponseDTO {
  dados: Colheita[];
  ultimoId: string;
  temMais: boolean;
}
