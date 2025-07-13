import { ProducaoStatusEnum } from "../types/producao.enum";

export interface DashboardProducaoAtualizarParams {
  producaoId: string;
  statusAnterior: ProducaoStatusEnum | null;
  statusAtual: ProducaoStatusEnum;
  qtdPlanejada: number;
  qtdColhida: number;
  data: Date;
}

export interface IDashboardProducaoService {
  atualizar(dados: DashboardProducaoAtualizarParams): Promise<void>;
}
