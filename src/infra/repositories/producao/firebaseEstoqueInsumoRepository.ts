import { admin } from "@/infra/firebase/firebase-initialize";
import { EstoqueInsumo } from "@/domain/entities/producao/EstoqueInsumo";
import { IEstoqueInsumoRepository } from "@/domain/repositories/producao/IEstoqueInsumoRepository";
import { EstoqueInsumoFirebase } from "@/infra/firebase/models/producao/EstoqueInsumoFirebase";
import { EstoqueInsumoConverter } from "@/infra/firebase/converters/producao/EstoqueInsumoConverter";

export class FirebaseEstoqueInsumoRepository implements IEstoqueInsumoRepository {
  private readonly collectionName = "estoqueInsumo";

  private getCollection() {
    return admin.firestore().collection(this.collectionName);
  }

  async getAll(): Promise<EstoqueInsumo[]> {
    const snapshot = await this.getCollection().get();
    return snapshot.docs.map(doc => {
      const data = doc.data() as EstoqueInsumoFirebase;
      return EstoqueInsumoConverter.fromFirestore(data, doc.id);
    });
  }

  async insert(estoqueInsumo: EstoqueInsumo): Promise<void> {
    const data = EstoqueInsumoConverter.toFirestore(estoqueInsumo);
    await this.getCollection().doc(estoqueInsumo.id).set(data);
  }

 
}