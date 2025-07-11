// src/presentation/controllers/producao/FazendaController.ts
import { ProdutoAtualizarSchema } from "@/application/dtos/producao/Produto/ProdutoAtualizarDTO";
import { ProdutoBuscarTodosSchema } from "@/application/dtos/producao/Produto/ProdutoBuscarTodosDTO";
import { ProdutoInserirSchema } from "@/application/dtos/producao/Produto/ProdutoInserirDTO";
import { MedidaService } from "@/application/services/producao/MedidaService";
import { ProdutoService } from "@/application/services/producao/ProdutoService";
import { FirebaseMedidaRepository } from "@/infra/repositories/producao/firebaseMedidaRepository";
import { FirebaseProdutoRepository } from "@/infra/repositories/producao/firebaseProdutoRepository";
import { Request, Response, Router } from "express";

import { z, ZodError } from "zod";
import { verificarPermissaoSetor } from "../../middlewares/SetorMiddleware";
import { UsuarioSetorEnum } from "@/domain/types/usuario.enum";
import { FirebaseInsumoRepository } from "@/infra/repositories/producao/firebaseInsumoRepository";
import { InsumoService } from "@/application/services/producao/InsumoService";

export class ProdutoController {
  private _ProdutoService: ProdutoService;

  constructor() {
    const produtoRepository = new FirebaseProdutoRepository();
    const medidaRepository = new FirebaseMedidaRepository();
    const medidaService = new MedidaService(medidaRepository);
    const insumoRepository = new FirebaseInsumoRepository();
    const insumoService = new InsumoService(insumoRepository, medidaRepository);

    this._ProdutoService = new ProdutoService(
      produtoRepository,
      medidaRepository,
      insumoService
    );
  }

  async buscarTodos(req: Request, res: Response): Promise<void> {
    try {
      const dto = ProdutoBuscarTodosSchema.parse(req.body);
      const produtos = await this._ProdutoService.buscarTodos(dto);
      res.status(200).json(produtos);
    } catch (error) {
      console.error("Erro ao buscar Produtos:", error);
      let message = "Erro ao buscar produto";
      if (error instanceof ZodError) {
        message = error.message;
      }
      res.status(500).json({ message: "Erro ao buscar Produtos" });
    }
  }

  async inserir(req: Request, res: Response): Promise<void> {
    try {
      const dto = ProdutoInserirSchema.parse(req.body);
      await this._ProdutoService.inserir(dto);

      res.status(201).json({ message: "produto criado com sucesso" });
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
      console.error("Erro ao inserir Produto:", error);
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  }

  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const dto = ProdutoAtualizarSchema.parse(req.body);
      await this._ProdutoService.atualizar(dto);

      res.status(200).json({ message: "Produto atualizada com sucesso" });
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
    const controller = new ProdutoController();

    router.post("/", controller.buscarTodos.bind(controller));

    router.use(
      verificarPermissaoSetor(UsuarioSetorEnum.ADMIN, UsuarioSetorEnum.PRODUCAO)
    );
    router.post("/inserir", controller.inserir.bind(controller));
    router.post("/atualizar", controller.atualizar.bind(controller));

    return router;
  }
}
