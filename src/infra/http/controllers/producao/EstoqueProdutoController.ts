// src/presentation/controllers/producao/FazendaController.ts
import { EstoqueProdutoInserirSchema } from "@/application/dtos/producao/EstoqueProduto/EstoqueProdutoInserirDTO";
import { EstoqueProdutoService } from "@/application/services/producao/EstoqueProdutoService";
import { FirebaseEstoqueProdutoRepository } from "@/infra/repositories/producao/firebaseEstoqueProdutoRepository";
import { Request, Response, Router } from "express";

import { z } from "zod";

export class EstqueProdutoController {
  private _EstoqueProdutoService = new EstoqueProdutoService(new FirebaseEstoqueProdutoRepository());


  async buscarTodos(req: Request, res: Response): Promise<void> {
    try {
      const estoqueProdutos = await this._EstoqueProdutoService.getAll();
      res.status(200).json(estoqueProdutos);
    } catch (error) {
      console.error("Erro ao buscar estoque de produtos:", error);
      res.status(500).json({ message: "Erro ao buscar estoque de produtos" });
    }
  }

  async inserir(req: Request, res: Response): Promise<void> {
    try {
      const dto = EstoqueProdutoInserirSchema.parse(req.body);
      await this._EstoqueProdutoService.inserir(dto);

      res.status(201).json({ message: "estoque produtos criado com sucesso" });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Erro de validação",
          erros: error.errors.map(err => ({
            campo: err.path.join('.'),
            mensagem: err.message
          }))
        });
        return;
      }
      console.error("Erro ao inserir estoque produto:", error);
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  }


  static routes() {
    const router = Router();
    const controller = new EstqueProdutoController();
    
    router.get("/", controller.buscarTodos.bind(controller));
    router.post("/", controller.inserir.bind(controller)); 
    
    return router;
  }
}