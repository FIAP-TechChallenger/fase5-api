import { admin } from "@/infra/firebase/firebase-initialize";
import { IEstoqueProdutoRepository } from "@/domain/repositories/producao/IEstoqueProdutoRepository";
import { EstoqueProduto } from "@/domain/entities/producao/EstoqueProduto";
import { EstoqueProdutoFirebase } from "@/infra/firebase/models/producao/EstoqueProdutoFirebase";
import { EstoqueProdutoConverter } from "@/infra/firebase/converters/producao/EstoqueProdutoConverter";

export class FirebaseEstoqueProdutoRepository implements IEstoqueProdutoRepository {
  private readonly collectionName = "estoqueProdutos";

  private getCollection() {
    return admin.firestore().collection(this.collectionName);
  }

  async getAll(): Promise<EstoqueProduto[]> {
    const snapshot = await this.getCollection().get();
    return snapshot.docs.map(doc => {
      const data = doc.data() as EstoqueProdutoFirebase;
      return EstoqueProdutoConverter.fromFirestore(data, doc.id);
    });
  }

  async insert(estoqueProduto:EstoqueProduto): Promise<void> {
    const data = EstoqueProdutoConverter.toFirestore(estoqueProduto);
    await this.getCollection().doc(estoqueProduto.id).set(data);
  }

 
}