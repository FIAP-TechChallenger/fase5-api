import { ItemVenda } from "@/domain/entities/comercial/ItemVenda";
import { ItemVendaFirebase } from "../../models/comercial/ItemVendaFirebase";

export class ItemVendaConverter {
  static toFirestore(item: ItemVenda): ItemVendaFirebase {
    return {
      id: item.id,
      desconto: item.desconto,
      quantidade: item.quantidade,
      produtoId: item.produtoId,
      fazendaId: item.fazendaId,
      precoUnitario: item.precoUnitario,
      lucroUnitario: item.lucroUnitario,
    };
  }

  static fromFirestore(data: ItemVendaFirebase): ItemVenda {
    return new ItemVenda({
      id: data.id,
      desconto: data.desconto,
      quantidade: data.quantidade,
      produtoId: data.produtoId,
      fazendaId: data.fazendaId,
      precoUnitario: data.precoUnitario,
      lucroUnitario: data.lucroUnitario,
    });
  }
}
