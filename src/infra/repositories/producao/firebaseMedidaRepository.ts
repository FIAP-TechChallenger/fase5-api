import { admin } from "@/infra/firebase/firebase-initialize";
import { IMedidaRepository } from "@/domain/repositories/producao/IMedidaRepository";
import { Medida } from "@/domain/entities/producao/Medida";
import { MedidaConverter } from "@/infra/firebase/converters/producao/MedidaConverter";
import { MedidaFirebase } from "@/infra/firebase/models/producao/MedidaFirebase";
import { MedidaBuscarTodosDTO } from "@/application/dtos/producao/Medida/MedidaBuscarTodosDTO";
import { MedidaBuscarTodosResponseDTO } from "@/application/dtos/producao/Medida/MedidaBuscarTodosResponseDTO";

export class FirebaseMedidaRepository implements IMedidaRepository {
  async buscarTodos(
    dto: MedidaBuscarTodosDTO
  ): Promise<MedidaBuscarTodosResponseDTO> {
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
      const data = doc.data() as MedidaFirebase;
      return MedidaConverter.fromFirestore(data, doc.id);
    });
  
    const lastVisible = dados[dados.length - 1];
    return {
      dados,
      ultimoId: lastVisible?.id ?? null,
      temMais: dados.length === limite,
    };
  }

  async inserir(medida:Medida): Promise<void> {
    const data:MedidaFirebase = MedidaConverter.toFirestore(medida);
    await this._getCollection().doc(medida.id).set(data);
  }
  async buscarSigla(medidaId: string): Promise<string> {
    const doc = await this._getCollection().doc(medidaId).get();
  
    if (!doc.exists) {
      throw new Error(`Medida com ID ${medidaId} não encontrada`);
    }
    const data = doc.data() as MedidaFirebase;
    return data.sigla;
  }
  async buscarPorId(medidaId: string): Promise<Medida | null> {
    const doc = await this._getCollection().doc(medidaId).get();
    if (!doc.exists) return null;

    const data = doc.data() as MedidaFirebase;
    return MedidaConverter.fromFirestore(data, doc.id);
  }
  async atualizar(medida: Medida): Promise<void> {
    const data: MedidaFirebase = MedidaConverter.toFirestore(medida);
    await this._getCollection()
      .doc(medida.id)
      .update({ ...data });
  }


  private _getCollection() {
    return admin.firestore().collection("unidadeMedida");
  }
 
}

