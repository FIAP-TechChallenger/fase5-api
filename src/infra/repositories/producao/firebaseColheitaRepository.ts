import { admin } from "@/infra/firebase/firebase-initialize";
import { IColheitaRepository } from "@/domain/repositories/producao/IColheitaRepository";
import { ColheitaBuscarTodosDTO } from "@/application/dtos/producao/Colheita/ColheitaBuscarTodosDTO";
import { ColheitaBuscarTodosResponseDTO } from "@/application/dtos/producao/Colheita/ColheitaBuscarTodosResponseDTO";
import { ColheitaFirebase } from "@/infra/firebase/models/producao/ColheitaFirebase";
import { ColheitaConverter } from "@/infra/firebase/converters/producao/ColheitaConverter";
import { Colheita } from "@/domain/entities/producao/Colheita";

export class FirebaseColheitaRepository implements IColheitaRepository {
  async buscarTodos(
    dto: ColheitaBuscarTodosDTO
  ): Promise<ColheitaBuscarTodosResponseDTO> {
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
      const data = doc.data() as ColheitaFirebase;
      return ColheitaConverter.fromFirestore(data, doc.id);
    });
  
    const lastVisible = dados[dados.length - 1];
    return {
      dados,
      ultimoId: lastVisible?.id ?? null,
      temMais: dados.length === limite,
    };
  }
  async buscarPorId(colheitaId: string): Promise<Colheita | null> {
    const doc = await this._getCollection().doc(colheitaId).get();
    if (!doc.exists) return null;

    const data = doc.data() as ColheitaFirebase;
    return ColheitaConverter.fromFirestore(data, doc.id);
  }

  async insert(colheita: Colheita): Promise<void> {
    const data:ColheitaFirebase = ColheitaConverter.toFirestore(colheita);
    await this._getCollection().doc(colheita.id).set(data);
  }

  async atualizar(colheita: Colheita): Promise<void> {
    const data: ColheitaFirebase = ColheitaConverter.toFirestore(colheita);
    await this._getCollection()
      .doc(colheita.id)
      .update({ ...data });
  }

  private _getCollection() {
    return admin.firestore().collection("colheita");
  }
 
}