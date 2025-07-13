import { ProducaoStatusEnum } from "@/domain/types/producao.enum";

export interface IDashboardProducaoRepository {
  updateStatusChange(
    statusAnterior: ProducaoStatusEnum | null,
    statusAtual: ProducaoStatusEnum
  ): Promise<void>;
  getPorStatus(): Promise<Record<ProducaoStatusEnum, number>>;
}
