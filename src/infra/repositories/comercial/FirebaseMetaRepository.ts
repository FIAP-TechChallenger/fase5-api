import { admin } from "@/infra/firebase/firebase-initialize";
import { Meta } from "@/domain/entities/comercial/Meta";
import { IMetaRepository } from "@/domain/repositories/comercial/IMetaRepository";
import { MetaConverter } from "@/infra/firebase/converters/comercial/MetaConverter";
import { MetaFirebase } from "@/infra/firebase/models/comercial/MetaFirebase";
import { MetaBuscarTodosDTO } from "@/application/dtos/comercial/MetaBuscarTodosDTO";
import { MetaBuscarTodosResponseDTO } from "@/application/dtos/comercial/MetaBuscarTodosResponseDTO";
import { MetaTipoEnum } from "@/domain/types/meta.enum";

export class FirebaseMetaRepository implements IMetaRepository {
  async buscarTodos(
    dto: MetaBuscarTodosDTO
  ): Promise<MetaBuscarTodosResponseDTO> {
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
      const data = doc.data() as MetaFirebase;
      return MetaConverter.fromFirestore(data, doc.id);
    });

    const lastVisible = dados[dados.length - 1];
    return {
      dados,
      ultimoId: lastVisible?.id ?? null,
      temMais: dados.length === limite,
    };
  }

  async buscarPorId(metaId: string): Promise<Meta | null> {
    const doc = await this._getCollection().doc(metaId).get();
    if (!doc.exists) return null;

    const data = doc.data() as MetaFirebase;
    return MetaConverter.fromFirestore(data, doc.id);
  }

  async buscarPorPeriodoETipo(data: Date, tipo: MetaTipoEnum): Promise<Meta[]> {
    const snapshot = await this._getCollection()
      .where("tipo", "==", tipo)
      .where("dataInicio", "<=", data)
      .where("dataFim", ">=", data)
      .get();

    return snapshot.docs.map((doc) => {
      const data = doc.data() as MetaFirebase;
      return MetaConverter.fromFirestore(data, doc.id);
    });
  }

  async inserir(meta: Meta): Promise<void> {
    const data: MetaFirebase = MetaConverter.toFirestore(meta);
    await this._getCollection().doc(meta.id).set(data);
  }

  async atualizar(meta: Meta): Promise<void> {
    const data: MetaFirebase = MetaConverter.toFirestore(meta);
    await this._getCollection()
      .doc(meta.id)
      .update({ ...data });
  }

  private _getCollection() {
    return admin.firestore().collection("metas");
  }
}
