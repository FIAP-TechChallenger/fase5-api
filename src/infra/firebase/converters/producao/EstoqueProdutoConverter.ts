import { Timestamp } from "firebase-admin/firestore";
import { EstoqueProduto } from "@/domain/entities/producao/EstoqueProduto";
import { EstoqueProdutoFirebase } from "../../models/producao/EstoqueProdutoFirebase";

export class EstoqueProdutoConverter {
  static toFirestore(estoqueProduto: EstoqueProduto): EstoqueProdutoFirebase {
    return {
      produtoId: estoqueProduto.produtoId,
      quantidade: estoqueProduto.quantidade,
      preco: estoqueProduto.preco ?? 0,
      lote: estoqueProduto.lote,
      producaoId: estoqueProduto.producaoId,
      fazendaId:estoqueProduto.fazendaId,
      criadaEm: this._toTimestamp(estoqueProduto.criadaEm),
      atualizadaEm: this._toTimestamp(estoqueProduto.atualizadaEm),
    };
  }

  static fromFirestore(data: EstoqueProdutoFirebase, id: string): EstoqueProduto {
    return new EstoqueProduto({
      id,
      produtoId: data.produtoId,
      quantidade: data.quantidade,
      preco: data.preco,
      lote: data.lote,
      producaoId: data.producaoId,
      fazendaId:data.fazendaId,
      criadaEm: data.criadaEm?.toDate() || new Date(),
      atualizadaEm: data.atualizadaEm?.toDate() || new Date(),
    });
  }

  private static _toTimestamp(date?: Date): Timestamp | null {
    return date ? Timestamp.fromDate(date) : null;
  }
}