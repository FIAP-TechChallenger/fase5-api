import { admin } from "../../firebase/firebase-initialize";
import { Meta } from "@/domain/entities/comercial/Meta";
import { IMetaRepository } from "@/domain/repositories/comercial/IMetaRepository";

export class FirebaseMetaRepository implements IMetaRepository {
  async inserir(meta: Meta): Promise<void> {
    await this._getCollection()
      .doc(meta.id)
      .set({ ...meta });
  }

  async atualizar(meta: Meta): Promise<void> {
    await this._getCollection()
      .doc(meta.id)
      .update({ ...meta });
  }

  async buscarPorId(metaId: string): Promise<Meta | null> {
    const doc = await this._getCollection().doc(metaId).get();
    if (!doc.exists) return null;

    const data = doc.data() as Meta;
    return { ...data, id: doc.id };
  }

  private _getCollection() {
    return admin.firestore().collection("metas");
  }
}
