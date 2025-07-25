import { admin } from "@/infra/firebase/firebase-initialize";
import { Insumo } from "@/domain/entities/producao/Insumo";
import { InsumoFirebase } from "@/infra/firebase/models/producao/InsumoFirebase";
import { InsumoConverter } from "@/infra/firebase/converters/producao/InsumoConverter";
import { InsumoBuscarTodosDTO } from "@/application/dtos/producao/Insumo/InsumoBuscarTodosDTO";
import { InsumoBuscarTodosResponseDTO } from "@/application/dtos/producao/Insumo/InsumoBuscarTodosResponseDTO";
import { IInsumoRepository } from "@/domain/repositories/producao/IInsumoRepository";

export class FirebaseInsumoRepository implements IInsumoRepository {
  async buscarTodos(
    dto: InsumoBuscarTodosDTO
  ): Promise<InsumoBuscarTodosResponseDTO> {
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
      const data = doc.data() as InsumoFirebase;
      return InsumoConverter.fromFirestore(data, doc.id);
    });
  
    const lastVisible = dados[dados.length - 1];
    return {
      dados,
      ultimoId: lastVisible?.id ?? null,
      temMais: dados.length === limite,
    };
  }
  async buscarPorId(id: string): Promise<Insumo | null> {
    const doc = await this._getCollection().doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data() as InsumoFirebase;
    return InsumoConverter.fromFirestore(data, doc.id);
  }
  async buscarPorIds(ids: string[]): Promise<Insumo[]> {
    if (ids.length === 0) return [];
  
    const snapshot = await admin.firestore()
      .collection("insumo")
      .where(admin.firestore.FieldPath.documentId(), "in", ids)
      .get();
  
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return new Insumo({
        id: doc.id,
        nome: data.nome,
        unidadeMedidaId: data.unidadeMedidaId,
        unidadeMedidaSigla: data.unidadeMedidaSigla,
        criadaEm: data.criadaEm?.toDate() || new Date(),
      });
    });
  }
  async insert(insumo: Insumo): Promise<void> {
    const data:InsumoFirebase = InsumoConverter.toFirestore(insumo);
    await this._getCollection().doc(insumo.id).set(data);
  }
  async atualizar(insumo: Insumo): Promise<void> {
    const data: InsumoFirebase = InsumoConverter.toFirestore(insumo);
    await this._getCollection()
      .doc(insumo.id)
      .update({ ...data });
  }


  private _getCollection() {
    return admin.firestore().collection("insumo");
  }
 
}

