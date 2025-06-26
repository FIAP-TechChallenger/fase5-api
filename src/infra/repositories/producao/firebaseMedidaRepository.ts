// import { admin } from "@/infra/firebase/firebase-initialize";
// import { IMedidaRepository } from "@/domain/repositories/producao/IMedidaRepository";
// import { Medida } from "@/domain/entities/producao/Medida";

// export class FirebaseMedidaRepository implements IMedidaRepository {
//   private readonly collectionName = "produtos";

//   private getCollection() {
//     return admin.firestore().collection(this.collectionName);
//   }

//   async getAll(): Promise<Medida[]> {
//     const snapshot = await this.getCollection().get();
//     return snapshot.docs.map(doc => {
//       const data = doc.data() as MedidaFirebase;
//       return MedidaConverter.fromFirestore(data, doc.id);
//     });
//   }

//   async insert(medida:Medida): Promise<void> {
//     const data = MedidaConverter.toFirestore(medida);
//     await this.getCollection().doc(medida.id).set(data);
//   }

// }