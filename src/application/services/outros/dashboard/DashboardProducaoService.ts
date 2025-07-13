import { IDashboardProducaoRepository } from "@/domain/repositories/outros/IDashboardProducaoRepository";
import { DashboardProducaoPorStatusDTO } from "@/application/dtos/outros/dashboard/DashboardProducaoPorStatusDTO";
import { ProducaoStatusEnum } from "@/domain/types/producao.enum";
import {
  DashboardProducaoAtualizarParams,
  IDashboardProducaoService,
} from "@/domain/interfaces/IDashboardProducaoService";
import { DashboardProducaoProduzidoVsPerdasDTO } from "@/application/dtos/outros/dashboard/DashboardProducaoProduzidoVsPerdasDTO";

export class DashboardProducaoService implements IDashboardProducaoService {
  constructor(private readonly _dashRepo: IDashboardProducaoRepository) {}

  async getPorStatus(): Promise<DashboardProducaoPorStatusDTO[]> {
    const statusMap = await this._dashRepo.getPorStatus();

    return Object.entries(statusMap).map(([status, qtd]) => ({
      status: status as ProducaoStatusEnum,
      qtd,
    }));
  }

  async getProduzidoVsPerdas(): Promise<DashboardProducaoProduzidoVsPerdasDTO> {
    const dados = await this._dashRepo.getPerdas();

    let totalProduzido = 0;
    let totalPerdas = 0;

    for (const item of dados) {
      totalProduzido += item.quantidadeColhida || 0;
      totalPerdas += item.quantidadePerdida || 0;
    }

    return { perdas: totalPerdas, produzido: totalProduzido };
  }

  async atualizar(params: DashboardProducaoAtualizarParams): Promise<void> {
    await Promise.all([
      this._dashRepo.updateStatusChange(
        params.statusAnterior,
        params.statusAtual
      ),
      this._dashRepo.addPerdas(
        params.producaoId,
        params.qtdPlanejada,
        params.qtdColhida,
        params.data
      ),
    ]);
  }
}
