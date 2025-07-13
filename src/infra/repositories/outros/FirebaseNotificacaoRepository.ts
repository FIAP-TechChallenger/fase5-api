import { admin } from "@/infra/firebase/firebase-initialize";
import { INotificacaoRepository } from "@/domain/repositories/outros/INotificacaoRepository";
import { Notificacao } from "@/domain/entities/outros/Notificacao";
import { NotificacaoConverter } from "@/infra/firebase/converters/outros/NotificacaoConverter";
import { NotificacaoFirebase } from "@/infra/firebase/models/outros/NotificacaoFirebase";
import { NotificacaoTipoEnum } from "@/domain/types/notificacao.enum";
import { getFirebaseTimeStamp } from "@/shared/utils/getFirebaseTimeStamp";
import { NotificacaoBuscarTodasResponseDTO } from "@/application/dtos/outros/notificacao/NotificacaoBuscarTodasResponseDTO";
import { NotificacaoBuscarTodasDTO } from "@/application/dtos/outros/notificacao/NotificacaoBuscarTodasDTO";

export class FirebaseNotificacaoRepository implements INotificacaoRepository {
  async inserir(dados: Notificacao): Promise<void> {
    const data: NotificacaoFirebase = NotificacaoConverter.toFirestore(dados);
    await this._getCollection().doc(dados.id).set(data);
  }

  async buscarPorTipos(
    tipos: NotificacaoTipoEnum[],
    dto: NotificacaoBuscarTodasDTO
  ): Promise<NotificacaoBuscarTodasResponseDTO> {
    if (!tipos?.length) return { dados: [], ultimoId: null, temMais: false };

    const limite = dto?.limite ?? 10;

    let query = this._getCollection()
      .where("tipo", "in", tipos)
      .orderBy("dataEnvio", "desc")
      .limit(limite);

    if (dto?.ultimoId) {
      const lastSnap = await this._getCollection().doc(dto.ultimoId).get();
      if (lastSnap.exists) {
        query = query.startAfter(lastSnap);
      }
    }

    const snapshot = await query.get();
    const dados = snapshot.docs.map((doc) => {
      const data = doc.data() as NotificacaoFirebase;
      return NotificacaoConverter.fromFirestore(data, doc.id);
    });

    const lastVisible = dados[dados.length - 1];
    return {
      dados,
      ultimoId: lastVisible?.id ?? null,
      temMais: dados.length === limite,
    };
  }

  async marcarTodasComoLidas(userId: string): Promise<void> {
    const snapshot = await this._getCollection()
      .orderBy("dataEnvio", "desc")
      .get();

    const batch = admin.firestore().batch();

    for (const doc of snapshot.docs) {
      const leituraDoc = await doc.ref
        .collection("leituraPorUsuario")
        .doc(userId)
        .get();

      if (!leituraDoc.exists) {
        const leituraRef = doc.ref.collection("leituraPorUsuario").doc(userId);

        batch.set(leituraRef, {
          lida: true,
          dataLeitura: getFirebaseTimeStamp(new Date()),
        });
      }
    }

    await batch.commit();
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

  private _getCollection() {
    return admin.firestore().collection("notificacoes");
  }
}
