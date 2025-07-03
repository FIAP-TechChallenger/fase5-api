import { IMetaRepository } from "@/domain/repositories/comercial/IMetaRepository";
import { MetaCalculoPorEnum, MetaTipoEnum } from "@/domain/types/meta.enum";
import { DateUtils } from "@/shared/utils/date.utils";

interface MetaAtualizarValorTipoProducaoParams {
  usuarioId: string;
  quantidade: number;
  valorTotal: number; // usado apenas se calculoPor === VALOR
  data?: Date; // opcional (padrão: hoje)
}

export class MetaAtualizarValorTipoProducaoService {
  constructor(private readonly metaRepository: IMetaRepository) {}

  async executar(dados: MetaAtualizarValorTipoProducaoParams): Promise<void> {
    const hoje = DateUtils.getStartOfDay(dados.data ?? new Date());

    // Buscar metas de PRODUCAO no período atual
    const metas = await this.metaRepository.buscarPorPeriodoETipo(
      hoje,
      MetaTipoEnum.PRODUCAO
    );

    for (const meta of metas) {
      if (meta.calculoPor === MetaCalculoPorEnum.QUANTIDADE) {
        meta.valorAtual += dados.quantidade;
      } else if (meta.calculoPor === MetaCalculoPorEnum.VALOR) {
        meta.valorAtual += dados.valorTotal;
      }

      await this.metaRepository.atualizar(meta);
    }
  }
}
