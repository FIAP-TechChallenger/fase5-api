import { IDashboardProducaoRepository } from "@/domain/repositories/outros/IDashboardProducaoRepository";
import { DashboardProducaoPorStatusDTO } from "@/application/dtos/outros/dashboard/DashboardProducaoPorStatusDTO";
import { ProducaoStatusEnum } from "@/domain/types/producao.enum";
import {
  DashboardProducaoAtualizarParams,
  IDashboardProducaoService,
} from "@/domain/interfaces/IDashboardProducaoService";

export class DashboardProducaoService implements IDashboardProducaoService {
  constructor(private readonly _dashProdRepo: IDashboardProducaoRepository) {}

  async getPorStatus(): Promise<DashboardProducaoPorStatusDTO[]> {
    const statusMap = await this._dashProdRepo.getPorStatus();

    return Object.entries(statusMap).map(([status, qtd]) => ({
      status: status as ProducaoStatusEnum,
      qtd,
    }));
  }

  async atualizar(params: DashboardProducaoAtualizarParams): Promise<void> {
    await Promise.all([
      this._dashProdRepo.updateStatusChange(
        params.statusAnterior,
        params.statusAtual
      ),
    ]);
  }
}
