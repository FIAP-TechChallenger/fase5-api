import { admin } from "@/infra/firebase/firebase-initialize";
import { Produto } from "@/domain/entities/producao/Produto";
import { IINsumoRepository } from "@/domain/repositories/producao/IInsumoRepository";
import { Insumo } from "@/domain/entities/producao/Insumo";
import { InsumoFirebase } from "@/infra/firebase/models/producao/InsumoFirebase";
import { InsumoConverter } from "@/infra/firebase/converters/producao/InsumoConverter";

export class FirebaseInsumoRepository implements IINsumoRepository {
  private readonly collectionName = "insumos";

  private getCollection() {
    return admin.firestore().collection(this.collectionName);
  }

  async getAll(): Promise<Produto[]> {
    const snapshot = await this.getCollection().get();
    return snapshot.docs.map(doc => {
      const data = doc.data() as InsumoFirebase;
      return InsumoConverter.fromFirestore(data, doc.id);
    });
  }

  async insert(insumo:Insumo): Promise<void> {
    const data = InsumoConverter.toFirestore(insumo);
    await this.getCollection().doc(insumo.id).set(data);
  }
}
 
