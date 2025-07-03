import { Insumo } from "@/domain/entities/producao/Insumo";
import { Produto } from "@/domain/entities/producao/Produto";



export interface InsumoBuscarTodosResponseDTO {
    dados: Insumo[];
    ultimoId: string;
    temMais: boolean;
  }
  