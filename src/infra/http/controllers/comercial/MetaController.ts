import { Request, Response, Router } from "express";
import { MetaInserirSchema } from "@/application/dtos/comercial/MetaInserirDTO";
import { MetaAtualizarSchema } from "@/application/dtos/comercial/MetaAtualizarDTO";
import { MetaBuscarTodosSchema } from "@/application/dtos/comercial/MetaBuscarTodosDTO";
import { ZodError } from "zod";
import { UsuarioSetorEnum } from "@/domain/types/usuario.enum";
import { verificarPermissaoSetor } from "../../middlewares/SetorMiddleware";
import { container } from "@/infra/container/container";

export class MetaController {
  async buscarTodos(req: Request, res: Response): Promise<void> {
    try {
      const dto = MetaBuscarTodosSchema.parse(req.body);
      const metas = await container.metaService.buscarTodos(dto);
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
      await container.metaService.inserir(req.user.id, dto);

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
      await container.metaService.atualizar(dto);

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
    router.use(
      verificarPermissaoSetor(
        UsuarioSetorEnum.ADMIN,
        UsuarioSetorEnum.COMERCIAL
      )
    );
    router.post("/", controller.buscarTodos.bind(controller));
    router.post("/inserir", controller.inserir.bind(controller));
    router.post("/atualizar", controller.atualizar.bind(controller));
    return router;
  }
}
