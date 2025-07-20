import { ProducaoAtualizarSchema } from "@/application/dtos/producao/Producao/ProducaoAtualizarDTO";
import { ProducaoBuscarTodosSchema } from "@/application/dtos/producao/Producao/ProducaoBuscarTodosDTO";
import { ProducaoInserirSchema } from "@/application/dtos/producao/Producao/ProducaoInserirDTO";
import { Request, Response, Router } from "express";
import { ZodError } from "zod";
import { z } from "zod";
import { verificarPermissaoSetor } from "../../middlewares/SetorMiddleware";
import { UsuarioSetorEnum } from "@/domain/types/usuario.enum";
import { container } from "@/infra/container/container";

export class ProducaoController {
  async buscarTodos(req: Request, res: Response): Promise<void> {
    try {
      const dto = ProducaoBuscarTodosSchema.parse(req.body);
      const producao = await container.producaoService.buscarTodos(dto);
      res.status(200).json(producao);
    } catch (error) {
      console.error("Erro ao buscar producao:", error);
      let message = "Erro ao buscar producao";
      if (error instanceof ZodError) {
        message = error.message;
      }
      res.status(500).json({ message: "Erro ao buscar producao" });
    }
  }

  async inserir(req: Request, res: Response): Promise<void> {
    try {
      const dto = ProducaoInserirSchema.parse(req.body);
      await container.producaoService.inserir(dto);

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

  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const dto = ProducaoAtualizarSchema.parse(req.body);
      await container.producaoService.atualizar(dto);

      res.status(200).json({ message: "Producao atualizada com sucesso" });
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
    const controller = new ProducaoController();

    router.post("/", controller.buscarTodos.bind(controller));

    router.use(
      verificarPermissaoSetor(UsuarioSetorEnum.ADMIN, UsuarioSetorEnum.PRODUCAO)
    );
    router.post("/inserir", controller.inserir.bind(controller));
    router.post("/atualizar", controller.atualizar.bind(controller));

    return router;
  }
}
