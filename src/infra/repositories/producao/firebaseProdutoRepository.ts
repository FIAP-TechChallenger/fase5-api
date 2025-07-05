
import { IProdutoRepository } from "@/domain/repositories/producao/IProdutoRepository";
import { Produto } from "@/domain/entities/producao/Produto";
import { ProdutoConverter } from "@/infra/firebase/converters/producao/ProdutoConverter";
import { ProdutoFirebase } from "@/infra/firebase/models/producao/ProdutoFirebase";
import { admin } from "@/infra/firebase/firebase-initialize";
import { ProdutoBuscarTodosResponseDTO } from "@/application/dtos/producao/Produto/ProdutoBuscarTodosResponseDTO";
import { ProdutoBuscarTodosDTO } from "@/application/dtos/producao/Produto/ProdutoBuscarTodosDTO";

export class FirebaseProdutoRepository implements IProdutoRepository {
  async buscarTodos(
    dto: ProdutoBuscarTodosDTO
  ): Promise<ProdutoBuscarTodosResponseDTO> {
    const limite = dto?.limite ?? 10;
  
    let query = this._getCollection()
      .orderBy("criadaEm", "desc")
      .orderBy("__name__")
      .limit(limite);
  
    if (dto?.ultimoId) {
      const lastSnap = await this._getCollection().doc(dto.ultimoId).get();
      if (lastSnap.exists) {
        query = query.startAfter(lastSnap);
      }
    }
  
    const snapshot = await query.get();
    const dados = snapshot.docs.map((doc) => {
      const data = doc.data() as ProdutoFirebase;
      return ProdutoConverter.fromFirestore(data, doc.id);
    });
  
    const lastVisible = dados[dados.length - 1];
    return {
      dados,
      ultimoId: lastVisible?.id ?? null,
      temMais: dados.length === limite,
    };
  }

  async buscarPorId(id: string): Promise<Produto | null> {
    const doc = await this._getCollection().doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data() as ProdutoFirebase;
    return ProdutoConverter.fromFirestore(data, doc.id);
    
  }
  async insert(produto: Produto): Promise<void> {
    const data:ProdutoFirebase = ProdutoConverter.toFirestore(produto);
    await this._getCollection().doc(produto.id).set(data);
  }

  private _getCollection() {
    return admin.firestore().collection("produto");
  }
 
}