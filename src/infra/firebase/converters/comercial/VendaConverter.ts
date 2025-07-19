import { Venda } from "@/domain/entities/comercial/Venda";
import { VendaFirebase } from "../../models/comercial/VendaFirebase";
import { getFirebaseTimeStamp } from "@/shared/utils/getFirebaseTimeStamp";
import { ItemVendaConverter } from "./ItemVendaConverter";

export class VendaConverter {
  static toFirestore(venda: Venda): VendaFirebase {
    return {
      id: venda.id,
      criadaEm: getFirebaseTimeStamp(venda.criadaEm),
      dataVenda: getFirebaseTimeStamp(venda.dataVenda),
      cliente: venda.cliente,
      imposto: venda.imposto,
      valorTotal: venda.valorTotal,
      status: venda.status,
      itens: venda.itens.map(ItemVendaConverter.toFirestore),
    };
  }

  static fromFirestore(data: VendaFirebase, id: string): Venda {
    return new Venda({
      id,
      criadaEm:data.criadaEm.toDate(),
      dataVenda: data.dataVenda.toDate(),
      cliente: data.cliente,
      imposto: data.imposto,
      valorTotal: data.valorTotal,
      status: data.status,
      itens: data.itens.map(ItemVendaConverter.fromFirestore),
    });
  }
}