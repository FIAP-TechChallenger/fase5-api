// src/presentation/controllers/producao/FazendaController.ts
import { EstoqueInsumoAtualizarSchema } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoAtualizarDTO";
import { EstoqueInsumoBuscarTodosSchema } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoBuscarTodosDTO";
import { EstoqueInsumoInserirSchema } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoInserirDTO";
import { InsumoInserirSchema } from "@/application/dtos/producao/Insumo/InsumoInserirDTO";
import { EstoqueInsumoService } from "@/application/services/producao/EstoqueInsumoService";
import { InsumoService } from "@/application/services/producao/InsumoService";
import { FirebaseEstoqueInsumoRepository } from "@/infra/repositories/producao/firebaseEstoqueInsumoRepository";
import { FirebaseInsumoRepository } from "@/infra/repositories/producao/firebaseInsumoRepository";
import { FirebaseMedidaRepository } from "@/infra/repositories/producao/firebaseMedidaRepository";
import { Request, Response, Router } from "express";

import { z, ZodError } from "zod";
import { verificarPermissaoSetor } from "../../middlewares/SetorMiddleware";
import { UsuarioSetorEnum } from "@/domain/types/usuario.enum";

export class EstoqueInsumoController {
  private _EstoqueInsumoService: EstoqueInsumoService;

  constructor() {
    // Injetando todas as dependências
    this._EstoqueInsumoService = new EstoqueInsumoService(
      new FirebaseEstoqueInsumoRepository(),
      new FirebaseInsumoRepository(),
      new FirebaseMedidaRepository()
    );
  }

  async buscarTodos(req: Request, res: Response): Promise<void> {
    try {
      const dto = EstoqueInsumoBuscarTodosSchema.parse(req.body);
      const estoqueInsumos = await this._EstoqueInsumoService.buscarTodos(dto);
      res.status(200).json(estoqueInsumos);
    } catch (error) {
      console.error("Erro ao buscar estoque de insumos:", error);
      let message = "Erro ao buscar estoque de insumos";
      if (error instanceof ZodError) {
        message = error.message;
      }
      res.status(500).json({ message: "Erro ao buscar  estoque de insumos" });
    }
  }

  async inserir(req: Request, res: Response): Promise<void> {
    try {
      const dto = EstoqueInsumoInserirSchema.parse(req.body);
      await this._EstoqueInsumoService.inserir(dto);

      res.status(201).json({ message: " estoque insumo criado com sucesso" });
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
      console.error("Erro ao inserir insumo:", error);
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  }
  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const dto = EstoqueInsumoAtualizarSchema.parse(req.body);
      await this._EstoqueInsumoService.atualizar(dto);

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
    const controller = new EstoqueInsumoController();

    router.post("/", controller.buscarTodos.bind(controller));

    router.use(
      verificarPermissaoSetor(UsuarioSetorEnum.ADMIN, UsuarioSetorEnum.PRODUCAO)
    );
    router.post("/inserir", controller.inserir.bind(controller));
    router.post("/atualizar", controller.atualizar.bind(controller));

    return router;
  }
}
