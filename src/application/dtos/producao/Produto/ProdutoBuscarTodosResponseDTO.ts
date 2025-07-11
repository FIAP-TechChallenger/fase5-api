import { Produto } from "@/domain/entities/producao/Produto";

// ProdutoItemDTO.ts
export interface InsumoDetalhadoDTO {
  id: string;
  nome: string;
}

export type ProdutoItemDTO = Produto & {
  unidadeMedidaSigla?: string;
  insumosDetalhados?: InsumoDetalhadoDTO[];
};

// ProdutoBuscarTodosResponseDTO.ts
export interface ProdutoBuscarTodosResponseDTO {
  dados: ProdutoItemDTO[];
  ultimoId: string | null;
  temMais: boolean;
}