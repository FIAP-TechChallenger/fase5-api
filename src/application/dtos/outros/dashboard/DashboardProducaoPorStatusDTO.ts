import { ProducaoStatusEnum } from "@/domain/types/producao.enum";

export interface DashboardProducaoPorStatusDTO {
  status: ProducaoStatusEnum;
  qtd: number;
}
