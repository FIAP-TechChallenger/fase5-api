import { Insumo } from "@/domain/entities/producao/Insumo";



export interface InsumoBuscarTodosResponseDTO {
    dados: Insumo[];
    ultimoId: string;
    temMais: boolean;
  }
  