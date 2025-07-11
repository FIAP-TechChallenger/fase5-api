import { Timestamp } from "firebase-admin/firestore";
import { Produto } from "@/domain/entities/producao/Produto";
import { ProdutoFirebase } from "../../models/producao/ProdutoFirebase";

export class ProdutoConverter {
  static toFirestore(produto: Produto): ProdutoFirebase {
    return {
      nome: produto.nome,
      unidadeMedidaId: produto.unidadeMedidaId, 
      criadaEm: this._toTimestamp(produto.criadaEm), 
      insumos: produto.insumos ?? [] // <-- incluir aqui
    };
  }

  static fromFirestore(data: ProdutoFirebase, id: string): Produto {
    return new Produto({
      id,
      nome: data.nome,
      unidadeMedidaId: data.unidadeMedidaId, 
      criadaEm: data.criadaEm?.toDate() || new Date(),
      insumos: data.insumos ?? [],
    });
  }

  private static _toTimestamp(date?: Date): Timestamp | null {
    return date ? Timestamp.fromDate(date) : null;
  }
}