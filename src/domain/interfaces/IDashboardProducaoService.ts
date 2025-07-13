import { ProducaoStatusEnum } from "../types/producao.enum";

export interface DashboardProducaoAtualizarParams {
  statusAnterior: ProducaoStatusEnum | null;
  statusAtual: ProducaoStatusEnum;
  qtdProduzido: number;
  qtdPerdas: number;
  data: Date;
}

export interface IDashboardProducaoService {
  atualizar(dados: DashboardProducaoAtualizarParams): Promise<void>;
}
