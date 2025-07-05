import { EstoqueInsumo } from "@/domain/entities/producao/EstoqueInsumo";


export type EstoqueInsumoItemDTO = EstoqueInsumo & {
  insumoNome?: string;
  unidadeMedidaSigla?: string;
};

export interface EstoqueInsumoBuscarTodosResponseDTO {
  dados: EstoqueInsumoItemDTO[];
  ultimoId: string | null;
  temMais: boolean;
}