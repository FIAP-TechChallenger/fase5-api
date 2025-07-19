import { ItemVenda } from "@/domain/entities/comercial/ItemVenda";
import { Venda } from "@/domain/entities/comercial/Venda";

export interface ItemVendaComNome extends ItemVenda {
  produtoNome?: string;
}

export interface VendaComNome extends Venda {
  itens: ItemVendaComNome[];
}

export interface VendaBuscarTodosResponseDTO {
  dados: VendaComNome[];
  ultimoId: string;
  temMais: boolean;
}