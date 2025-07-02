import { Fazenda } from "@/domain/entities/producao/Fazenda";

export interface FazendaBuscarTodosResponseDTO {
  dados: Fazenda[];
  ultimoId: string;
  temMais: boolean;
}
