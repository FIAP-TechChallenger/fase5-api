import { IMetaRepository } from "@/domain/repositories/comercial/IMetaRepository";
import { MetaStatusEnum, MetaTipoEnum } from "@/domain/types/meta.enum";
import { DateUtils } from "@/shared/utils/date.utils";
import { NotificacaoSendService } from "../outros/notificacao/NotificacaoSendService";
import { NotificacaoTipoEnum } from "@/domain/types/notificacao.enum";
import {
  IMetaAtualizarValorTipoProducaoService,
  MetaAtualizarValorTipoProducaoParams,
} from "@/domain/interfaces/IMetaAtualizarValorTipoProducaoService";
import { firestore } from "firebase-admin";
import { DocumentData } from "firebase-admin/firestore";

export class MetaAtualizarValorTipoProducaoService
  implements IMetaAtualizarValorTipoProducaoService
{
  constructor(private readonly metaRepository: IMetaRepository) {}

  async executar(dados: MetaAtualizarValorTipoProducaoParams): Promise<void> {
    const hoje = DateUtils.getStartOfDay(new Date());

    const metas = await this.metaRepository.buscarAtivasHojePorTipo(
      MetaTipoEnum.PRODUCAO
    );

    const batch = firestore().batch();
    const notify: string[] = [];

    for (const meta of metas) {
      const docRef = this.metaRepository.buscarRefPorId(meta.id);

      if (meta.dataFim < hoje) {
        batch.update(docRef, { status: MetaStatusEnum.NAO_ALCANCADA });
      } else {
        meta.valorAtual += dados.qtdColhida;
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
        await this._notificarMetaConcluida(metaTitle);
      }
    }
  }

  private async _notificarMetaConcluida(metaTitulo: string) {
    NotificacaoSendService.instance.send({
      tipo: NotificacaoTipoEnum.META_CONCLUIDA,
      titulo: "Meta concluída",
      descricao: `A meta de "${MetaTipoEnum.PRODUCAO}" com título "${metaTitulo}" foi alcançada.`,
    });
  }
}
