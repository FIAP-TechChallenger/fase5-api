import { Request, Response, Router } from "express";
import { container } from "@/infra/container/container";

export class DashboardController {
  async buscarProducaoPorStatus(req: Request, res: Response) {
    try {
      const dados = await container.dashboardProducaoService.getPorStatus();
      res.status(201).json(dados);
    } catch (error: any) {
      res.status(400).json({
        message: "Erro ao buscar dados de produção por status",
        error: error.message,
      });
    }
  }

  static routes() {
    const router = Router();
    const controller = new DashboardController();
    router.get(
      "/producaoPorStatus",
      controller.buscarProducaoPorStatus.bind(controller)
    );
    return router;
  }
}
