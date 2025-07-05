
import { EstoqueProduto } from "@/domain/entities/producao/EstoqueProduto";


export type EstoqueProdutoItemDTO = EstoqueProduto & {
  produtoNome?: string;
  unidadeMedidaSigla?: string;
};
export interface EstoqueProdutoBuscarTodosResponseDTO {
    dados: EstoqueProdutoItemDTO[];
    ultimoId: string;
    temMais: boolean;
  }
  