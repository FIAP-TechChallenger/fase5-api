import { admin } from "@/infra/firebase/firebase-initialize";
import { IEstoqueProdutoRepository } from "@/domain/repositories/producao/IEstoqueProdutoRepository";
import { EstoqueProduto } from "@/domain/entities/producao/EstoqueProduto";
import { EstoqueProdutoFirebase } from "@/infra/firebase/models/producao/EstoqueProdutoFirebase";
import { EstoqueProdutoConverter } from "@/infra/firebase/converters/producao/EstoqueProdutoConverter";
import { EstoqueProdutoBuscarTodosDTO } from "@/application/dtos/producao/EstoqueProduto/EstoqueProdutoBuscarTodosDTO";
import { EstoqueProdutoBuscarTodosResponseDTO } from "@/application/dtos/producao/EstoqueProduto/EstoqueProdutoBuscarTodosResponseDTO";
import { EstoqueInsumo } from "@/domain/entities/producao/EstoqueInsumo";
import { EstoqueInsumoFirebase } from "@/infra/firebase/models/producao/EstoqueInsumoFirebase";
import { EstoqueInsumoConverter } from "@/infra/firebase/converters/producao/EstoqueInsumoConverter";
import { getFirebaseTimeStamp } from "@/shared/utils/getFirebaseTimeStamp";

export class FirebaseEstoqueProdutoRepository
  implements IEstoqueProdutoRepository
{
  async buscarTodos(
    dto: EstoqueProdutoBuscarTodosDTO
  ): Promise<EstoqueProdutoBuscarTodosResponseDTO> {
    const limite = dto?.limite ?? 10;

    let query = this._getCollection()
      .orderBy("criadaEm", "desc")
      .orderBy("__name__")
      .limit(limite);

    if (dto?.ultimoId) {
      const lastSnap = await this._getCollection().doc(dto.ultimoId).get();
      if (lastSnap.exists) {
        query = query.startAfter(lastSnap);
      }
    }

    const snapshot = await query.get();
    const dados = snapshot.docs.map((doc) => {
      const data = doc.data() as EstoqueProdutoFirebase;
      return EstoqueProdutoConverter.fromFirestore(data, doc.id);
    });

    const lastVisible = dados[dados.length - 1];
    return {
      dados,
      ultimoId: lastVisible?.id ?? null,
      temMais: dados.length === limite,
    };
  }

  async buscarPorId(estoqueId: string): Promise<EstoqueProduto | null> {
    const doc = await this._getCollection().doc(estoqueId).get();
    if (!doc.exists) return null;

    const data = doc.data() as EstoqueProdutoFirebase;
    return EstoqueProdutoConverter.fromFirestore(data, doc.id);
  }

  async insert(estoqueProduto: EstoqueProduto): Promise<void> {
    estoqueProduto.atualizadaEm = new Date();
    const data: EstoqueProdutoFirebase =
      EstoqueProdutoConverter.toFirestore(estoqueProduto);
    await this._getCollection().doc(estoqueProduto.id).set(data);
  }
  async atualizar(estoque: EstoqueProduto): Promise<void> {
    estoque.atualizadaEm = new Date();
    const data: EstoqueProdutoFirebase =
      EstoqueProdutoConverter.toFirestore(estoque);
    await this._getCollection()
      .doc(estoque.id)
      .update({ ...data });
  }
  async buscarPorInsumoOrdenado(insumoId: string): Promise<EstoqueInsumo[]> {
    const snapshot = await this._getCollection()
      .where("insumoId", "==", insumoId)
      .orderBy("criadaEm", "asc") // FIFO, por exemplo
      .get();

    return snapshot.docs.map((doc) => {
      const data = doc.data() as EstoqueInsumoFirebase;
      return EstoqueInsumoConverter.fromFirestore(data, doc.id);
    });
  }

  async debitarQuantidade(
    estoqueId: string,
    quantidade: number
  ): Promise<void> {
    const docRef = this._getCollection().doc(estoqueId);
    await admin.firestore().runTransaction(async (transaction) => {
      const doc = await transaction.get(docRef);
      if (!doc.exists) throw new Error("Estoque não encontrado");

      const data = doc.data() as EstoqueProdutoFirebase;
      const quantidadeAtual = data.quantidade ?? 0;
      const novaQuantidade = quantidadeAtual - quantidade;

      if (novaQuantidade < 0) {
        throw new Error("Estoque insuficiente");
      }

      transaction.update(docRef, {
        quantidade: novaQuantidade,
        atualizadaEm: getFirebaseTimeStamp(new Date()),
      });
    });
  }

  async buscarPorProdutoOrdenado(produtoId: string): Promise<EstoqueProduto[]> {
    const snapshot = await this._getCollection()
      .where("produtoId", "==", produtoId)
      .orderBy("criadaEm", "asc") // FIFO
      .get();
    console.log(
      `[Repository] Lotes encontrados para produto ${produtoId}:`,
      snapshot.docs.length
    );
    return snapshot.docs.map((doc) => {
      const data = doc.data() as EstoqueProdutoFirebase;
      return EstoqueProdutoConverter.fromFirestore(data, doc.id);
    });
  }

  private _getCollection() {
    return admin.firestore().collection("estoqueProduto");
  }
}
