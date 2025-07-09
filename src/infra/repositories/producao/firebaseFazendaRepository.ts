import { admin } from "@/infra/firebase/firebase-initialize";
import { Fazenda } from "@/domain/entities/producao/Fazenda";
import { IFazendaRepository } from "@/domain/repositories/producao/IFazendaRepository";
import { FazendaConverter } from "@/infra/firebase/converters/producao/FazendaConverter";
import { FazendaFirebase } from "@/infra/firebase/models/producao/FazendaFirebase";
import { FazendaBuscarTodosDTO } from "@/application/dtos/producao/fazenda/FazendaBuscarTodosDTO";
import { FazendaBuscarTodosResponseDTO } from "@/application/dtos/producao/fazenda/FazendaBuscarTodosResponseDTO";

export class FirebaseFazendaRepository implements IFazendaRepository {
  

  async buscarTodos(
    dto: FazendaBuscarTodosDTO
  ): Promise<FazendaBuscarTodosResponseDTO> {
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
      const data = doc.data() as FazendaFirebase;
      return FazendaConverter.fromFirestore(data, doc.id);
    });
  
    const lastVisible = dados[dados.length - 1];
    return {
      dados,
      ultimoId: lastVisible?.id ?? null,
      temMais: dados.length === limite,
    };
  }
  async buscarNome(fazendaId: string): Promise<string> {
    const doc = await this._getCollection().doc(fazendaId).get();
  
    if (!doc.exists) {
      throw new Error(`fazenda com ID ${fazendaId} não encontrada`);
    }
    const data = doc.data() as FazendaFirebase;
    return data.nome;
  }

  async buscarPorId(fazendaId: string): Promise<Fazenda | null> {
    const doc = await this._getCollection().doc(fazendaId).get();
    if (!doc.exists) return null;

    const data = doc.data() as FazendaFirebase;
    return FazendaConverter.fromFirestore(data, doc.id);
  }
  async insert(fazenda: Fazenda): Promise<void> {
    const data:FazendaFirebase = FazendaConverter.toFirestore(fazenda);
    await this._getCollection().doc(fazenda.id).set(data);
  }
  async atualizar(fazenda: Fazenda): Promise<void> {
    const data: FazendaFirebase = FazendaConverter.toFirestore(fazenda);
    await this._getCollection()
      .doc(fazenda.id)
      .update({ ...data });
  }



  private _getCollection() {
    return admin.firestore().collection("fazenda");
  }
 
}


