import { EstoqueProdutoAtualizarSchema } from "@/application/dtos/producao/EstoqueProduto/EstoqueProdutoAtualizarDTO";
import { EstoqueProdutoBuscarTodosSchema } from "@/application/dtos/producao/EstoqueProduto/EstoqueProdutoBuscarTodosDTO";
import { EstoqueProdutoInserirSchema } from "@/application/dtos/producao/EstoqueProduto/EstoqueProdutoInserirDTO";
import { Request, Response, Router } from "express";
import { z, ZodError } from "zod";
import { verificarPermissaoSetor } from "../../middlewares/SetorMiddleware";
import { UsuarioSetorEnum } from "@/domain/types/usuario.enum";
import { container } from "@/infra/container/container";

export class EstqueProdutoController {
  async buscarTodos(req: Request, res: Response): Promise<void> {
    try {
      const dto = EstoqueProdutoBuscarTodosSchema.parse(req.body);
      const estoqueProdutos = await container.estoqueProdutoService.buscarTodos(
        dto
      );
      res.status(200).json(estoqueProdutos);
    } catch (error) {
      console.error("Erro ao buscar estoque de produtos:", error);
      let message = "Erro ao buscar estoque de produtos";
      if (error instanceof ZodError) {
        message = error.message;
      }
      res.status(500).json({ message: "Erro ao buscar estoque de produtos" });
    }
  }

  async inserir(req: Request, res: Response): Promise<void> {
    try {
      const dto = EstoqueProdutoInserirSchema.parse(req.body);
      await container.estoqueProdutoService.inserir(dto);

      res.status(201).json({ message: "estoque produtos criado com sucesso" });
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
      console.error("Erro ao inserir estoque produto:", error);
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  }
  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const dto = EstoqueProdutoAtualizarSchema.parse(req.body);
      await container.estoqueProdutoService.atualizar(dto);

      res
        .status(200)
        .json({ message: "estoqueProduto atualizada com sucesso" });
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
    const controller = new EstqueProdutoController();

    router.post("/", controller.buscarTodos.bind(controller));

    router.use(
      verificarPermissaoSetor(UsuarioSetorEnum.ADMIN, UsuarioSetorEnum.PRODUCAO)
    );
    router.post("/inserir", controller.inserir.bind(controller));
    router.post("/atualizar", controller.atualizar.bind(controller));

    return router;
  }
}
