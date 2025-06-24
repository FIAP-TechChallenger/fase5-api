import { admin } from "@/infra/firebase/firebase-initialize";
import { Meta } from "@/domain/entities/comercial/Meta";
import { IMetaRepository } from "@/domain/repositories/comercial/IMetaRepository";
import { MetaConverter } from "@/infra/firebase/converters/comercial/MetaConverter";
import { MetaFirebase } from "@/infra/firebase/models/comercial/MetaFirebase";

export class FirebaseMetaRepository implements IMetaRepository {
  async buscarTodos(): Promise<Meta[]> {
    const snapshot = await this._getCollection().get();
    return snapshot.docs.map((doc) => {
      const data = doc.data() as MetaFirebase;
      return MetaConverter.fromFirestore(data, doc.id);
    });
  }

  async buscarPorId(metaId: string): Promise<Meta | null> {
    const doc = await this._getCollection().doc(metaId).get();
    if (!doc.exists) return null;

    const data = doc.data() as MetaFirebase;
    return MetaConverter.fromFirestore(data, doc.id);
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
