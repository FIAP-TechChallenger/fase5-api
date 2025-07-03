import { Producao } from "@/domain/entities/producao/Producao";


export interface ProducaoBuscarTodosResponseDTO {
    dados: Producao[];
    ultimoId: string;
    temMais: boolean;
  }
  