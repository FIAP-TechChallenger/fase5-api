// src/presentation/controllers/producao/FazendaController.ts
import { ProdutoBuscarTodosSchema } from "@/application/dtos/producao/Produto/ProdutoBuscarTodosDTO";
import { ProdutoInserirSchema } from "@/application/dtos/producao/Produto/ProdutoInserirDTO";
import { ProdutoService } from "@/application/services/producao/ProdutoService";
import { FirebaseProdutoRepository } from "@/infra/repositories/producao/firebaseProdutoRepository";
import { Request, Response, Router } from "express";

import { z, ZodError } from "zod";

export class ProdutoController {
  private _ProdutoService = new ProdutoService(new FirebaseProdutoRepository());


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
          erros: error.errors.map(err => ({
            campo: err.path.join('.'),
            mensagem: err.message
          }))
        });
        return;
      }
      console.error("Erro ao inserir Produto:", error);
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  }


  static routes() {
    const router = Router();
    const controller = new ProdutoController();
    
    router.post("/", controller.buscarTodos.bind(controller));
    router.post("/inserir", controller.inserir.bind(controller)); 
    
    return router;
  }
}