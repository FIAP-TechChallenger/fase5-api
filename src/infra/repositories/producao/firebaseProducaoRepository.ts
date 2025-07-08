import { ProducaoBuscarTodosDTO } from "@/application/dtos/producao/Producao/ProducaoBuscarTodosDTO";
import { ProducaoBuscarTodosResponseDTO } from "@/application/dtos/producao/Producao/ProducaoBuscarTodosResponse";
import { Producao } from "@/domain/entities/producao/Producao";
import { IProducaoRepository } from "@/domain/repositories/producao/IProducaoRepository";
import { ProducaoConverter } from "@/infra/firebase/converters/producao/ProducaoConverter";
import { admin } from "@/infra/firebase/firebase-initialize";
import { ProducaoFirebase } from "@/infra/firebase/models/producao/ProducaoFirebase";

export class FirebaseProducaoRepository implements IProducaoRepository {
  async buscarTodos(
    dto: ProducaoBuscarTodosDTO
  ): Promise<ProducaoBuscarTodosResponseDTO> {
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
      const data = doc.data() as ProducaoFirebase;
      return ProducaoConverter.fromFirestore(data, doc.id);
    });
  
    const lastVisible = dados[dados.length - 1];
    return {
      dados,
      ultimoId: lastVisible?.id ?? null,
      temMais: dados.length === limite,
    };
  }
  async buscarPorId(producaoId: string): Promise<Producao | null> {
    const doc = await this._getCollection().doc(producaoId).get();
    if (!doc.exists) return null;

    const data = doc.data() as ProducaoFirebase;
    return ProducaoConverter.fromFirestore(data, doc.id);
  }

  async insert(producao:Producao): Promise<void> {
    const data:ProducaoFirebase = ProducaoConverter.toFirestore(producao);
    await this._getCollection().doc(producao.id).set(data);
  }
  
  async atualizar(producao : Producao): Promise<void> {
    const data: ProducaoFirebase = ProducaoConverter.toFirestore(producao);
    await this._getCollection()
      .doc(producao.id)
      .update({ ...data });
  }
  
  private _getCollection() {
    return admin.firestore().collection("producao");
  }
 
}

