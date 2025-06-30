import { admin } from "@/infra/firebase/firebase-initialize";
import { IProdutoRepository } from "@/domain/repositories/producao/IProdutoRepository";
import { Produto } from "@/domain/entities/producao/Produto";
import { ProdutoConverter } from "@/infra/firebase/converters/producao/ProdutoConverter";
import { ProdutoFirebase } from "@/infra/firebase/models/producao/ProdutoFirebase";

export class FirebaseProdutoRepository implements IProdutoRepository {
  private readonly collectionName = "produtos";

  private getCollection() {
    return admin.firestore().collection(this.collectionName);
  }

  async getAll(): Promise<Produto[]> {
    const snapshot = await this.getCollection().get();
    return snapshot.docs.map(doc => {
      const data = doc.data() as ProdutoFirebase;
      return ProdutoConverter.fromFirestore(data, doc.id);
    });
  }

  async insert(produto:Produto): Promise<void> {
    const data = ProdutoConverter.toFirestore(produto);
    await this.getCollection().doc(produto.id).set(data);
  }

 
}