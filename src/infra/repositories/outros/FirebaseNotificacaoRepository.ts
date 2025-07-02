import { admin } from "@/infra/firebase/firebase-initialize";
import { INotificacaoRepository } from "@/domain/repositories/outros/INotificacaoRepository";
import { Notificacao } from "@/domain/entities/outros/Notificacao";
import { NotificacaoConverter } from "@/infra/firebase/converters/outros/NotificacaoConverter";
import { NotificacaoFirebase } from "@/infra/firebase/models/outros/NotificacaoFirebase";
import { NotificacaoTipoEnum } from "@/domain/types/notificacao.enum";

export class FirebaseNotificacaoRepository implements INotificacaoRepository {
  async buscarTodos(): Promise<Notificacao[]> {
    const snapshot = await this._getCollection().get();
    return snapshot.docs.map((doc) => {
      const data = doc.data() as NotificacaoFirebase;
      return NotificacaoConverter.fromFirestore(data, doc.id);
    });
  }

  async inserir(dados: Notificacao): Promise<void> {
    const data: NotificacaoFirebase = NotificacaoConverter.toFirestore(dados);
    await this._getCollection().doc(dados.id).set(data);
  }

  async marcarComoLida(id: string, userId: string): Promise<void> {
    const leituraRef = this._getCollection()
      .doc(id)
      .collection("leituraPorUsuario")
      .doc(userId);

    await leituraRef.set({
      lida: true,
      dataLeitura: admin.firestore.Timestamp.now(),
    });
  }

  async buscarQtdNaoLidas(userId: string): Promise<number> {
    const snapshot = await this._getCollection().get();
    let count = 0;

    for (const doc of snapshot.docs) {
      const leituraRef = doc.ref.collection("leituraPorUsuario").doc(userId);
      const leituraSnap = await leituraRef.get();

      if (!leituraSnap.exists) {
        count++;
      }
    }

    return count;
  }

  async buscarPorTipo(tipo: NotificacaoTipoEnum): Promise<Notificacao[]> {
    const snapshot = await this._getCollection()
      .where("tipo", "==", tipo)
      .orderBy("dataEnvio", "desc")
      .get();

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return new Notificacao({
        id: doc.id,
        titulo: data.titulo,
        descricao: data.descricao,
        tipo: data.tipo,
        dataEnvio: data.dataEnvio.toDate(),
        lida: false,
      });
    });
  }

  private _getCollection() {
    return admin.firestore().collection("notificacoes");
  }
}
