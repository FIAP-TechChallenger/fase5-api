
import { EstoqueProduto } from "@/domain/entities/producao/EstoqueProduto";

export interface EstoqueProdutoBuscarTodosResponseDTO {
    dados: EstoqueProduto[];
    ultimoId: string;
    temMais: boolean;
  }
  