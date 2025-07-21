import { admin } from "@/infra/firebase/firebase-initialize";
import { Meta } from "@/domain/entities/comercial/Meta";
import { IMetaRepository } from "@/domain/repositories/comercial/IMetaRepository";
import { MetaConverter } from "@/infra/firebase/converters/comercial/MetaConverter";
import { MetaFirebase } from "@/infra/firebase/models/comercial/MetaFirebase";
import { MetaBuscarTodosDTO } from "@/application/dtos/comercial/MetaBuscarTodosDTO";
import { MetaBuscarTodosResponseDTO } from "@/application/dtos/comercial/MetaBuscarTodosResponseDTO";
import {
  MetaStatusEnum,
  MetaStatusFiltroEnum,
  MetaTipoEnum,
} from "@/domain/types/meta.enum";
import { firestore } from "firebase-admin";
import { getFirebaseTimeStamp } from "@/shared/utils/getFirebaseTimeStamp";
import {
  DocumentData,
  DocumentReference,
  Timestamp,
} from "firebase-admin/firestore";
import { DateUtils } from "@/shared/utils/date.utils";

export class FirebaseMetaRepository implements IMetaRepository {
  async buscarTodos(
    dto: MetaBuscarTodosDTO
  ): Promise<MetaBuscarTodosResponseDTO> {
    const limite = dto?.limite ?? 10;

    let baseQuery = this._getCollection()
      .orderBy("criadaEm", "desc")
      .orderBy("__name__");

    if (dto.ultimoId) {
      const lastSnap = await this._getCollection().doc(dto.ultimoId).get();
      if (lastSnap.exists) baseQuery = baseQuery.startAfter(lastSnap);
    }

    if (dto.tipo) {
      baseQuery = baseQuery.where("tipo", "==", dto.tipo);
    }

    // Filtar por status
    switch (dto.status) {
      case MetaStatusFiltroEnum.ALCANCADA:
        baseQuery = baseQuery.where("status", "==", MetaStatusEnum.ALCANCADA);
        break;
      case MetaStatusFiltroEnum.EM_ANDAMENTO:
        baseQuery = baseQuery.where(
          "status",
          "==",
          MetaStatusEnum.EM_ANDAMENTO
        );
        break;
      case MetaStatusFiltroEnum.NAO_ALCANCADA:
        baseQuery = baseQuery.where(
          "status",
          "==",
          MetaStatusEnum.NAO_ALCANCADA
        );
        break;
    }

    const snapshot = await baseQuery.get();
    let dados = snapshot.docs.map((doc) => {
      const data = doc.data() as MetaFirebase;
      return MetaConverter.fromFirestore(data, doc.id);
    });

    // Atualiza informações das metas EM_ANDAMENTO
    if (dto.status !== MetaStatusFiltroEnum.TODOS) {
      const { ativas, naoAtendidas } = this._separarAtivas(dados);
      dados = ativas;
      if (naoAtendidas.length) this._atualizarNaoAtendidas(naoAtendidas);
    }

    const lastVisible = dados[dados.length - 1];
    return {
      dados,
      ultimoId: lastVisible?.id ?? null,
      temMais: dados.length === limite,
    };
  }

  buscarRefPorId(
    metaId: string
  ): DocumentReference<DocumentData, DocumentData> {
    return this._getCollection().doc(metaId);
  }

  async buscarPorId(metaId: string): Promise<Meta | null> {
    const doc = await this._getCollection().doc(metaId).get();
    if (!doc.exists) return null;

    const data = doc.data() as MetaFirebase;
    return MetaConverter.fromFirestore(data, doc.id);
  }

  async buscarAtivasHojePorTipo(tipo: MetaTipoEnum): Promise<Meta[]> {
    const dataLimite = DateUtils.getStartOfDay(new Date());

    const snapshot = await this._getCollection()
      .where("tipo", "==", tipo)
      .where("status", "==", MetaStatusEnum.EM_ANDAMENTO)
      .where("dataFim", ">=", Timestamp.fromDate(dataLimite))
      .get();

    return snapshot.docs.map((doc) => {
      const data = doc.data() as MetaFirebase;
      return MetaConverter.fromFirestore(data, doc.id);
    });
  }

  async inserir(meta: Meta): Promise<void> {
    const data: MetaFirebase = MetaConverter.toFirestore(meta);
    await this._getCollection().doc(meta.id).set(data);
  }

  async atualizar(meta: Meta): Promise<void> {
    const data: MetaFirebase = MetaConverter.toFirestore(meta);
    await this._getCollection()
      .doc(meta.id)
      .update({ ...data });
  }

  private _separarAtivas(metas: Meta[]) {
    const agora = Date.now();
    const ativas: Meta[] = [];
    const naoAtendidas: Meta[] = [];

    metas.forEach((m) => {
      const prazoFim = new Date(m.dataFim).getTime();
      prazoFim < agora && m.status === MetaStatusEnum.EM_ANDAMENTO
        ? naoAtendidas.push(m)
        : ativas.push(m);
    });
    return { ativas, naoAtendidas };
  }

  private async _atualizarNaoAtendidas(metas: Meta[]) {
    const agora = Date.now();
    const batch = firestore().batch();

    metas.forEach((m) => {
      const prazoFim = new Date(m.dataFim).getTime();
      if (prazoFim < agora && m.status === MetaStatusEnum.EM_ANDAMENTO) {
        const docRef = this.buscarRefPorId(m.id);
        batch.update(docRef, { status: MetaStatusEnum.NAO_ALCANCADA });
        m.status = MetaStatusEnum.NAO_ALCANCADA;
      }
    });
    await batch.commit();
  }

  private _getCollection() {
    return admin.firestore().collection("metas");
  }
}
