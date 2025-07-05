import { ZodError } from "zod";
import { Request, Response, Router } from "express";
import { NotificacaoService } from "@/application/services/outros/NotificacaoService";
import { FirebaseNotificacaoRepository } from "@/infra/repositories/outros/FirebaseNotificacaoRepository";
import { NotificacaoBuscarTodasSchema } from "@/application/dtos/outros/NotificacaoBuscarTodasDTO";
import { NotificacaoSendService } from "@/application/services/outros/NotificacaoSendService";
import { NotificacaoTipoEnum } from "@/domain/types/notificacao.enum";

export class NotificacaoController {
  private _notificacaoService = new NotificacaoService(
    new FirebaseNotificacaoRepository()
  );

  async buscarTodas(req: Request, res: Response) {
    try {
      const dto = NotificacaoBuscarTodasSchema.parse(req.body);
      const dados = await this._notificacaoService.buscarTodas(req.user, dto);
      res.status(200).json(dados);
    } catch (error: any) {
      let message = "Erro ao buscar metas";
      if (error instanceof ZodError) {
        message = error.message;
      }
      res.status(500).json({ message });
    }
  }

  async buscarQtdNaoLidas(req: Request, res: Response) {
    try {
      const qtd = await this._notificacaoService.buscarQtdNaoLidas(req.user.id);
      res.status(200).json(qtd);
    } catch (error: any) {
      res.status(400).json({
        message: "Erro ao buscar a quantidade de notificações não lidas",
        error: error.message,
      });
    }
  }

  async marcarTodasComoLidas(req: Request, res: Response) {
    try {
      await this._notificacaoService.marcarTodasComoLidas(req.user.id);
      res.status(200).json({ message: "Marcado todas como lida" });
    } catch (error: any) {
      res.status(400).json({
        message: "Erro ao marcar todas as notificações como lidas",
        error: error.message,
      });
    }
  }

  async enviar(req: Request, res: Response) {
    NotificacaoSendService.instance.send({
      tipo: NotificacaoTipoEnum.META_CONCLUIDA,
      titulo: "Meta concluída",
      descricao: `A meta de "VENDA" com título "Meta fazenda São Paulo" foi alcançada.`,
    });
    res.status(200).json({ message: "Notificação enviada com sucesso" });
  }

  static routes() {
    const router = Router();
    const controller = new NotificacaoController();
    router.get(
      "/buscarQtdNaoLidas",
      controller.buscarQtdNaoLidas.bind(controller)
    );
    router.post("/", controller.buscarTodas.bind(controller));
    router.post(
      "/marcarTodasComoLidas",
      controller.marcarTodasComoLidas.bind(controller)
    );
    router.post("/enviar", controller.enviar.bind(controller));
    return router;
  }
}
