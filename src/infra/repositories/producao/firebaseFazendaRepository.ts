import { admin } from "@/infra/firebase/firebase-initialize";
import { Fazenda } from "@/domain/entities/producao/Fazenda";
import { IFazendaRepository } from "@/domain/repositories/producao/IFazendaRepository";
import { FazendaConverter } from "@/infra/firebase/converters/producao/FazendaConverter";
import { FazendaFirebase } from "@/infra/firebase/models/producao/FazendaFirebase";

export class FirebaseFazendaRepository implements IFazendaRepository {
  private readonly collectionName = "fazendas";

  private getCollection() {
    return admin.firestore().collection(this.collectionName);
  }

  async getAll(): Promise<Fazenda[]> {
    const snapshot = await this.getCollection().get();
    return snapshot.docs.map(doc => {
      const data = doc.data() as FazendaFirebase;
      return FazendaConverter.fromFirestore(data, doc.id);
    });
  }

  async insert(fazenda: Fazenda): Promise<void> {
    const data = FazendaConverter.toFirestore(fazenda);
    await this.getCollection().doc(fazenda.id).set(data);
  }

 
}