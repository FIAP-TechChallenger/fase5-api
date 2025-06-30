// src/presentation/controllers/producao/FazendaController.ts
import { EstoqueInsumoInserirSchema } from "@/application/dtos/producao/EstoqueInsumoInserirDTO";
import { InsumoInserirSchema } from "@/application/dtos/producao/InsumoInserirDTO";
import { EstoqueInsumoService } from "@/application/services/producao/EstoqueInsumoService";
import { InsumoService } from "@/application/services/producao/InsumoService";
import { FirebaseEstoqueInsumoRepository } from "@/infra/repositories/producao/firebaseEstoqueInsumoRepository";
import { FirebaseInsumoRepository } from "@/infra/repositories/producao/firebaseInsumoRepository";
import { Request, Response, Router } from "express";

import { z } from "zod";

export class EstoqueInsumoController {
  private _EstoqueInsumoService = new EstoqueInsumoService(new FirebaseEstoqueInsumoRepository());


  async buscarTodos(req: Request, res: Response): Promise<void> {
    try {
      const estoqueInsumos = await this._EstoqueInsumoService.getAll();
      res.status(200).json(estoqueInsumos);
    } catch (error) {
      console.error("Erro ao buscar estoque de insumos:", error);
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
          erros: error.errors.map(err => ({
            campo: err.path.join('.'),
            mensagem: err.message
          }))
        });
        return;
      }
      console.error("Erro ao inserir insumo:", error);
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  }


  static routes() {
    const router = Router();
    const controller = new EstoqueInsumoController();
    
    router.get("/", controller.buscarTodos.bind(controller));
    router.post("/", controller.inserir.bind(controller)); 
    
    return router;
  }
}