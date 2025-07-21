import { IMetaRepository } from "@/domain/repositories/comercial/IMetaRepository";
import {
  MetaCalculoPorEnum,
  MetaStatusEnum,
  MetaTipoEnum,
} from "@/domain/types/meta.enum";
import { DateUtils } from "@/shared/utils/date.utils";
import { NotificacaoSendService } from "../outros/notificacao/NotificacaoSendService";
import { NotificacaoTipoEnum } from "@/domain/types/notificacao.enum";
import {
  IMetaAtualizarValorPorTipoService,
  MetaAtualizarValorPorTipoParams,
} from "@/domain/interfaces/IMetaAtualizarValorPorTipoService";
import { firestore } from "firebase-admin";

export class MetaAtualizarValorPorTipoService
  implements IMetaAtualizarValorPorTipoService
{
  constructor(private readonly metaRepository: IMetaRepository) {}

  async executar(
    tipo: MetaTipoEnum,
    dados: MetaAtualizarValorPorTipoParams
  ): Promise<void> {
    const hoje = DateUtils.getStartOfDay(new Date());

    const metas = await this.metaRepository.buscarAtivasHojePorTipo(tipo);

    const batch = firestore().batch();
    const notify: string[] = [];

    for (const meta of metas) {
      const docRef = this.metaRepository.buscarRefPorId(meta.id);

      if (meta.dataFim < hoje) {
        batch.update(docRef, { status: MetaStatusEnum.NAO_ALCANCADA });
      } else {
        if (tipo === MetaTipoEnum.VENDA) {
          if (meta.calculoPor === MetaCalculoPorEnum.QUANTIDADE) {
            meta.valorAtual += dados.quantidade;
          } else if (meta.calculoPor === MetaCalculoPorEnum.VALOR) {
            meta.valorAtual += dados.valor ?? 0;
          }
        } else {
          meta.valorAtual += dados.quantidade;
        }

        const atendida = meta.valorAtual >= meta.valorAlvo;
        batch.update(docRef, {
          valorAtual: atendida ? meta.valorAlvo : meta.valorAtual,
          status: atendida ? MetaStatusEnum.ALCANCADA : meta.status,
        });

        if (atendida) notify.push(meta.titulo);
      }
    }
    await batch.commit();

    if (notify.length) {
      for await (const metaTitle of notify) {
        await this._notificarMetaConcluida(tipo, metaTitle);
      }
    }
  }

  private async _notificarMetaConcluida(
    tipo: MetaTipoEnum,
    metaTitulo: string
  ) {
    NotificacaoSendService.instance.send({
      tipo: NotificacaoTipoEnum.META_CONCLUIDA,
      titulo: `Meta de ${tipo} concluída`,
      descricao: `A meta "${metaTitulo}" foi alcançada, verifique na tela de metas.`,
    });
  }
}
