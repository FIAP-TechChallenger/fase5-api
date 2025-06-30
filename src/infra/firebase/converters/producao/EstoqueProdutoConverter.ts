import { Timestamp } from "firebase-admin/firestore";
import { EstoqueProduto } from "@/domain/entities/producao/EstoqueProduto";
import { EstoqueProdutoFirebase } from "../../models/producao/EstoqueProdutoFirebase";

export class EstoqueProdutoConverter {
  static toFirestore(estoqueProduto: EstoqueProduto): EstoqueProdutoFirebase {
    return {
        produtoId:estoqueProduto.produtoId,
        quantidade: estoqueProduto.quantidade,
        preco: estoqueProduto.preco || 0,
        criadaEm: this._toTimestamp(estoqueProduto.criadaEm), 
     
    };
  }

  static fromFirestore(data: EstoqueProdutoFirebase, id: string): EstoqueProduto {
    return new EstoqueProduto({
      id,
      produtoId:data.produtoId,
      quantidade: data.quantidade,
      preco: data.preco,
      criadaEm: data.criadaEm?.toDate() || new Date(),
      
    });
  }

  private static _toTimestamp(date?: Date): Timestamp | null {
    return date ? Timestamp.fromDate(date) : null;
  }
}