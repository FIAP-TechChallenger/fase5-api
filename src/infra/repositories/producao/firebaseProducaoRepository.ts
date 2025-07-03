import { Producao } from "@/domain/entities/producao/Producao";
import { IProducaoRepository } from "@/domain/repositories/producao/IProducaoRepository";
import { ProducaoConverter } from "@/infra/firebase/converters/producao/ProducaoConverter";
import { admin } from "@/infra/firebase/firebase-initialize";
import { ProducaoFirebase } from "@/infra/firebase/models/producao/ProducaoFirebase";

export class FirebaseProducaoRepository implements IProducaoRepository {
  private readonly collectionName = "producao";

  private getCollection() {
    return admin.firestore().collection(this.collectionName);
  }

  async getAll(): Promise<Producao[]> {
    const snapshot = await this.getCollection().get();
    return snapshot.docs.map((doc) => {
      const data = doc.data() as ProducaoFirebase;
      return ProducaoConverter.fromFirestore(data, doc.id);
    });
  }

  async insert(producao: Producao): Promise<void> {
    const data = ProducaoConverter.toFirestore(producao);
    await this.getCollection().doc(producao.id).set(data);
  }
}
