import { Timestamp } from "firebase-admin/firestore";
import { Produto } from "@/domain/entities/producao/Produto";
import { ProdutoFirebase } from "../../models/producao/ProdutoFirebase";

export class ProdutoConverter {
  static toFirestore(produto: Produto): ProdutoFirebase {
    return {
      nome: produto.nome,
      unidadeMedida:produto.unidadeMedida,
      criadaEm: this._toTimestamp(produto.criadaEm), 
     
    };
  }

  static fromFirestore(data: ProdutoFirebase, id: string): Produto {
    return new Produto({
      id,
      nome: data.nome,
      unidadeMedida: data.unidadeMedida,
      criadaEm: data.criadaEm?.toDate() || new Date(),
      
    });
  }

  private static _toTimestamp(date?: Date): Timestamp | null {
    return date ? Timestamp.fromDate(date) : null;
  }
}