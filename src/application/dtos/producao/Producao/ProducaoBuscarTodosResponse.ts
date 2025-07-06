import { Producao } from "@/domain/entities/producao/Producao";

export type ProducaoItemDTO = Producao & {
  produtoNome?: string;
  fazendaNome?: string;
};

export interface ProducaoBuscarTodosResponseDTO {
    dados: ProducaoItemDTO[];
    ultimoId: string;
    temMais: boolean;
  }
  