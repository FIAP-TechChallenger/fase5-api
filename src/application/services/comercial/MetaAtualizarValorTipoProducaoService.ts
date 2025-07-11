import { IMetaRepository } from "@/domain/repositories/comercial/IMetaRepository";
import { MetaCalculoPorEnum, MetaTipoEnum } from "@/domain/types/meta.enum";
import { DateUtils } from "@/shared/utils/date.utils";
import { NotificacaoSendService } from "../outros/NotificacaoSendService";
import { NotificacaoTipoEnum } from "@/domain/types/notificacao.enum";
import {
  IMetaAtualizarValorTipoProducaoService,
  MetaAtualizarValorTipoProducaoParams,
} from "@/domain/interfaces/IMetaAtualizarValorTipoProducaoService";

export class MetaAtualizarValorTipoProducaoService
  implements IMetaAtualizarValorTipoProducaoService
{
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

      if (meta.valorAtual >= meta.valorAlvo) {
        await this._notificarMetaConcluida(meta.tipo, meta.titulo);
      }
    }
  }

  private async _notificarMetaConcluida(
    metaTipo: MetaTipoEnum,
    metaTitulo: string
  ) {
    NotificacaoSendService.instance.send({
      tipo: NotificacaoTipoEnum.META_CONCLUIDA,
      titulo: "Meta concluída",
      descricao: `A meta de "${metaTipo}" com título "${metaTitulo}" foi alcançada.`,
    });
  }
}
