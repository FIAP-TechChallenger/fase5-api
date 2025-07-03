import { EstoqueInsumo } from "@/domain/entities/producao/EstoqueInsumo";

export interface EstoqueInsumoBuscarTodosResponseDTO {
    dados: EstoqueInsumo[];
    ultimoId: string;
    temMais: boolean;
  }
  