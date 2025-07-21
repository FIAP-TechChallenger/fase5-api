import { ZodError } from "zod";
import { Request, Response, Router } from "express";
import { NotificacaoBuscarTodasSchema } from "@/application/dtos/outros/notificacao/NotificacaoBuscarTodasDTO";
import { container } from "@/infra/container/container";

export class NotificacaoController {
  async buscarTodas(req: Request, res: Response) {
    try {
      const dto = NotificacaoBuscarTodasSchema.parse(req.body);
      const dados = await container.notificacaoService.buscarTodas(
        req.user,
        dto
      );
      res.status(200).json(dados);
    } catch (error: any) {
      let message = error?.message ?? "Erro ao buscar metas";
      if (error instanceof ZodError) {
        message = error.message;
      }
      res.status(500).json({ message });
    }
  }

  async buscarQtdNaoLidas(req: Request, res: Response) {
    try {
      const qtd = await container.notificacaoService.buscarQtdNaoLidas(
        req.user.id
      );
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
      await container.notificacaoService.marcarTodasComoLidas(req.user.id);
      res.status(200).json({ message: "Marcado todas como lida" });
    } catch (error: any) {
      res.status(400).json({
        message: "Erro ao marcar todas as notificações como lidas",
        error: error.message,
      });
    }
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
    return router;
  }
}
