import { admin } from "@/infra/firebase/firebase-initialize";
import { Timestamp } from "firebase-admin/firestore";
import { IDashboardProducaoRepository } from "@/domain/repositories/outros/IDashboardProducaoRepository";
import { ProducaoStatusEnum } from "@/domain/types/producao.enum";
import { DashboardProducaoPerdaFirebase } from "@/infra/firebase/models/outros/dashboard/DashboardProducaoPerda";

export class FirebaseDashboardProducaoRepository
  implements IDashboardProducaoRepository
{
  async getPorStatus(): Promise<Record<ProducaoStatusEnum, number>> {
    const snapshot = await this._getPorStatusCollection().get();
    const data = snapshot.data() as Record<ProducaoStatusEnum, number>;

    if (!data) {
      // Se não existir ainda, retorna todos com zero
      return { AGUARDANDO: 0, EM_PRODUCAO: 0, COLHIDA: 0 };
    }

    return {
      AGUARDANDO: data.AGUARDANDO ?? 0,
      EM_PRODUCAO: data.EM_PRODUCAO ?? 0,
      COLHIDA: data.COLHIDA ?? 0,
    };
  }

  async getPerdas(): Promise<DashboardProducaoPerdaFirebase[]> {
    const snapshot = await this._getPerdasCollection().get();
    return snapshot.docs.map(
      (doc) => doc.data() as DashboardProducaoPerdaFirebase
    );
  }

  async updateStatusChange(
    statusAnterior: ProducaoStatusEnum | null,
    statusAtual: ProducaoStatusEnum
  ): Promise<void> {
    const current = await this.getPorStatus();

    if (statusAnterior && current[statusAnterior] > 0) {
      current[statusAnterior]--;
    }

    current[statusAtual]++;

    await this._getPorStatusCollection().set({
      ...current,
      updatedAt: Timestamp.now(),
    });
  }

  async addPerdas(
    producaoId: string,
    qtdPlanejada: number,
    qtdColhida: number,
    dataColheita: Date
  ): Promise<void> {
    const docData: DashboardProducaoPerdaFirebase = {
      producaoId,
      quantidadeColhida: qtdColhida,
      quantidadePerdida: qtdPlanejada - qtdColhida,
      dataColheita: Timestamp.fromDate(dataColheita),
    };

    await this._getPerdasCollection().doc(producaoId).set(docData);
  }

  private _getPorStatusCollection() {
    return this._getCollection().doc("producaoPorStatus");
  }

  private _getPerdasCollection() {
    return this._getCollection().doc("producaoPerdas").collection("colhidas");
  }

  private _getCollection() {
    return admin.firestore().collection("dashboard");
  }
}
