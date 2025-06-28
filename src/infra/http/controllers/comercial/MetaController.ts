import { Request, Response, Router } from "express";
import { MetaService } from "@/application/services/comercial/MetaService";
import { FirebaseMetaRepository } from "@/infra/repositories/comercial/FirebaseMetaRepository";
import { MetaInserirSchema } from "@/application/dtos/comercial/MetaInserirDTO";
import { MetaAtualizarSchema } from "@/application/dtos/comercial/MetaAtualizarDTO";
import { MetaBuscarTodosSchema } from "@/application/dtos/comercial/MetaBuscarTodosDTO";
import { ZodError } from "zod";

export class MetaController {
  private _metaService = new MetaService(new FirebaseMetaRepository());

  async buscarTodos(req: Request, res: Response): Promise<void> {
    try {
      const dto = MetaBuscarTodosSchema.parse(req.body);
      const metas = await this._metaService.buscarTodos(dto);
      res.status(200).json(metas);
    } catch (error) {
      let message = "Erro ao buscar metas";
      if (error instanceof ZodError) {
        message = error.message;
      }
      res.status(500).json({ message });
    }
  }

  async inserir(req: Request, res: Response): Promise<void> {
    try {
      const dto = MetaInserirSchema.parse(req.body);
      await this._metaService.inserir(req.user.id, dto);

      res.status(201).json({ message: "Meta criada com sucesso" });
    } catch (error: any) {
      if (error.name === "ZodError") {
        res
          .status(400)
          .json({ message: "Erro de validação", erros: error.errors });
        return;
      }
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  }

  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const dto = MetaAtualizarSchema.parse(req.body);
      await this._metaService.atualizar(dto);

      res.status(200).json({ message: "Meta atualizada com sucesso" });
    } catch (error: any) {
      if (error.name === "ZodError") {
        res
          .status(400)
          .json({ message: "Erro de validação", erros: error.errors });
        return;
      }
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  }

  static routes() {
    const router = Router();
    const controller = new MetaController();
    router.post("/", controller.buscarTodos.bind(controller));
    router.post("/inserir", controller.inserir.bind(controller));
    router.post("/atualizar", controller.atualizar.bind(controller));
    return router;
  }
}
