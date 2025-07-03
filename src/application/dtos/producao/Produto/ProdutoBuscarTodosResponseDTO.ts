import { Produto } from "@/domain/entities/producao/Produto";

export interface ProdutoBuscarTodosResponseDTO {
    dados: Produto[];
    ultimoId: string;
    temMais: boolean;
  }
  