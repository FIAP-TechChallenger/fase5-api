// import { admin } from "@/infra/firebase/firebase-initialize";
// import { Fazenda } from "@/domain/entities/producao/Fazenda";
// import { FazendaConverter } from "@/infra/firebase/converters/producao/FazendaConverter";
// import { FazendaFirebase } from "@/infra/firebase/models/producao/FazendaFirebase";import { IProducaoRepository } from "@/domain/repositories/producao/IProducaoRepository";
// import { IProdutoRepository } from "@/domain/repositories/producao/IProdutoRepository";
// import { Produto } from "@/domain/entities/producao/Produto";
// import { EstoqueInsumo } from "@/domain/entities/producao/EstoqueInsumo";
// import { IEstoqueInsumoRepository } from "@/domain/repositories/producao/IEstoqueInsumoRepository";

// export class FirebaseEstoqueInsumoRepository implements IEstoqueInsumoRepository {
//   private readonly collectionName = "estoqueINsumo";

//   private getCollection() {
//     return admin.firestore().collection(this.collectionName);
//   }

//   async getAll(): Promise<EstoqueInsumo[]> {
//     const snapshot = await this.getCollection().get();
//     return snapshot.docs.map(doc => {
//       const data = doc.data() as EstoqueInsumoFirebase;
//       return EStoqueInsumoConverter.fromFirestore(data, doc.id);
//     });
//   }

//   async insert(estoqueInsumo: EstoqueInsumo): Promise<void> {
//     const data = EstoqueInsumoConverter.toFirestore(estoqueInsumo);
//     await this.getCollection().doc(estoqueInsumo.id).set(data);
//   }

 
// }