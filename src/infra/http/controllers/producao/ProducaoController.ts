// src/presentation/controllers/producao/FazendaController.ts

import { ProducaoInserirSchema } from "@/application/dtos/producao/Producao/ProducaoInserirDTO";
import { ProducaoService } from "@/application/services/producao/ProducaoService";
import { FirebaseProducaoRepository } from "@/infra/repositories/producao/firebaseProducaoRepository";
import { Request, Response, Router } from "express";

export class ProducaoController {
  private _ProducaoService = new ProducaoService(
    new FirebaseProducaoRepository()
  );

  async buscarTodos(req: Request, res: Response): Promise<void> {
    try {
      const producao = await this._ProducaoService.getAll();
      res.status(200).json(producao);
    } catch (error) {
      console.error("Erro ao buscar producao:", error);
      res.status(500).json({ message: "Erro ao buscar producao" });
    }
  }

  async inserir(req: Request, res: Response): Promise<void> {
    try {
      const dto = ProducaoInserirSchema.parse(req.body);
      await this._ProducaoService.inserir(dto);

      res.status(201).json({ message: "producao criado com sucesso" });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Erro de validação",
          erros: error.errors.map((err) => ({
            campo: err.path.join("."),
            mensagem: err.message,
          })),
        });
        return;
      }
      console.error("Erro ao inserir producao:", error);
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  }

  static routes() {
    const router = Router();
    const controller = new ProducaoController();

    router.get("/", controller.buscarTodos.bind(controller));
    router.post("/", controller.inserir.bind(controller));

    return router;
  }
}
