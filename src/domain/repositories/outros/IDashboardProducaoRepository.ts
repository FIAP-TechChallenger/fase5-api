import { ProducaoStatusEnum } from "@/domain/types/producao.enum";
import { DashboardProducaoPerdaFirebase } from "@/infra/firebase/models/outros/dashboard/DashboardProducaoPerda";

export interface IDashboardProducaoRepository {
  getPorStatus(): Promise<Record<ProducaoStatusEnum, number>>;
  getPerdas(): Promise<DashboardProducaoPerdaFirebase[]>;

  updateStatusChange(
    statusAnterior: ProducaoStatusEnum | null,
    statusAtual: ProducaoStatusEnum
  ): Promise<void>;

  addPerdas(
    producaoId: string,
    qtdPlanejada: number,
    qtdColhida: number,
    dataColheita: Date
  ): Promise<void>;
}
