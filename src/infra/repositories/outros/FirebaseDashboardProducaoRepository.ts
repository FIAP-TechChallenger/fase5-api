import { admin } from "@/infra/firebase/firebase-initialize";
import { Timestamp } from "firebase-admin/firestore";
import { IDashboardProducaoRepository } from "@/domain/repositories/outros/IDashboardProducaoRepository";
import { ProducaoStatusEnum } from "@/domain/types/producao.enum";

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

  private _getPorStatusCollection() {
    return admin.firestore().collection("dashboard").doc("producaoPorStatus");
  }
}
