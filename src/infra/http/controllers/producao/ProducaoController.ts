// src/presentation/controllers/producao/FazendaController.ts

import { ProducaoAtualizarSchema } from "@/application/dtos/producao/Producao/ProducaoAtualizarDTO";
import { ProducaoBuscarTodosSchema } from "@/application/dtos/producao/Producao/ProducaoBuscarTodosDTO";
import { ProducaoInserirSchema } from "@/application/dtos/producao/Producao/ProducaoInserirDTO";
import { ProducaoService } from "@/application/services/producao/ProducaoService";
import { FirebaseEstoqueProdutoRepository } from "@/infra/repositories/producao/firebaseEstoqueProdutoRepository";
import { FirebaseFazendaRepository } from "@/infra/repositories/producao/firebaseFazendaRepository";
import { FirebaseProducaoRepository } from "@/infra/repositories/producao/firebaseProducaoRepository";
import { FirebaseProdutoRepository } from "@/infra/repositories/producao/firebaseProdutoRepository";
import { Request, Response, Router } from "express";
import { ZodError } from "zod";
import { z } from "zod";

export class ProducaoController {
  private _ProducaoService: ProducaoService;

  constructor() {
    this._ProducaoService = new ProducaoService(
      new FirebaseProducaoRepository(),
      new FirebaseFazendaRepository(), 
      new FirebaseProdutoRepository(),
      new FirebaseEstoqueProdutoRepository
    )
  }

  async buscarTodos(req: Request, res: Response): Promise<void> {
    try {
      const dto = ProducaoBuscarTodosSchema.parse(req.body);
      const producao = await this._ProducaoService.buscarTodos(dto);
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

  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const dto = ProducaoAtualizarSchema.parse(req.body);
      await this._ProducaoService.atualizar(dto);

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
    router.post("/inserir", controller.inserir.bind(controller));
    router.post("/atualizar", controller.atualizar.bind(controller));

    return router;
  }
}
