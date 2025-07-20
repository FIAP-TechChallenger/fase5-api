import { admin } from "@/infra/firebase/firebase-initialize";
import { EstoqueInsumo } from "@/domain/entities/producao/EstoqueInsumo";
import { IEstoqueInsumoRepository } from "@/domain/repositories/producao/IEstoqueInsumoRepository";
import { EstoqueInsumoFirebase } from "@/infra/firebase/models/producao/EstoqueInsumoFirebase";
import { EstoqueInsumoConverter } from "@/infra/firebase/converters/producao/EstoqueInsumoConverter";
import { EstoqueInsumoBuscarTodosDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoBuscarTodosDTO";
import { EstoqueInsumoBuscarTodosResponseDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoBuscarTodosResponseDTO";

export class FirebaseEstoqueInsumoRepository implements IEstoqueInsumoRepository {
  async buscarTodos(
    dto: EstoqueInsumoBuscarTodosDTO
  ): Promise<EstoqueInsumoBuscarTodosResponseDTO> {
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
      const data = doc.data() as EstoqueInsumoFirebase;
      return EstoqueInsumoConverter.fromFirestore(data, doc.id);
    });
  
    const lastVisible = dados[dados.length - 1];
    return {
      dados,
      ultimoId: lastVisible?.id ?? null,
      temMais: dados.length === limite,
    };
  }
  async buscarPorId(estoqueId: string): Promise<EstoqueInsumo | null> {
    const doc = await this._getCollection().doc(estoqueId).get();
    if (!doc.exists) return null;

    const data = doc.data() as EstoqueInsumoFirebase;
    return EstoqueInsumoConverter.fromFirestore(data, doc.id);
  }

  async insert(estoqueInsumo: EstoqueInsumo): Promise<void> {
    const data:EstoqueInsumoFirebase = EstoqueInsumoConverter.toFirestore(estoqueInsumo);
    await this._getCollection().doc(estoqueInsumo.id).set(data);
  }

  async buscarPorInsumoId(insumoId: string): Promise<EstoqueInsumo | null> {
    const query = this._getCollection().where("insumoId", "==", insumoId).limit(1);
    const snapshot = await query.get();
    
    if (snapshot.empty) return null;
    
    const doc = snapshot.docs[0];
    const data = doc.data() as EstoqueInsumoFirebase;
    return EstoqueInsumoConverter.fromFirestore(data, doc.id);
  }

  async atualizarQuantidade(estoqueId: string, novaQuantidade: number): Promise<void> {
    await this._getCollection().doc(estoqueId).update({ quantidade: novaQuantidade });
  }
  
  async atualizar(estoque: EstoqueInsumo): Promise<void> {
    const data: EstoqueInsumoFirebase = EstoqueInsumoConverter.toFirestore(estoque);
    await this._getCollection()
      .doc(estoque.id)
      .update({ ...data });
  }
  async buscarTodosPorInsumo(insumoId: string): Promise<EstoqueInsumo[]> {
    const snapshot = await this._getCollection()
      .where("insumoId", "==", insumoId)
      .orderBy("criadaEm", "asc") // ou outro critério de prioridade
      .get();
  
    return snapshot.docs.map((doc) => {
      const data = doc.data() as EstoqueInsumoFirebase;
      return EstoqueInsumoConverter.fromFirestore(data, doc.id);
    });
  }
  async atualizarQuantidadeTransacional(
    transaction: FirebaseFirestore.Transaction,
    estoqueId: string,
    novaQuantidade: number
  ): Promise<void> {
    const ref = this._getCollection().doc(estoqueId);
    transaction.update(ref, {
      quantidade: novaQuantidade,
      atualizadaEm: new Date()
    });
  }
  

  private _getCollection() {
    return admin.firestore().collection("estoqueInsumo");
  }
 
}