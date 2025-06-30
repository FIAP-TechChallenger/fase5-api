// src/presentation/controllers/producao/FazendaController.ts
import { InsumoInserirSchema } from "@/application/dtos/producao/InsumoInserirDTO";
import { InsumoService } from "@/application/services/producao/InsumoService";
import { FirebaseInsumoRepository } from "@/infra/repositories/producao/firebaseInsumoRepository";
import { Request, Response, Router } from "express";

import { z } from "zod";

export class InsumoController {
  private _InsumoService = new InsumoService(new FirebaseInsumoRepository());


  async buscarTodos(req: Request, res: Response): Promise<void> {
    try {
      const fazendas = await this._InsumoService.getAll();
      res.status(200).json(fazendas);
    } catch (error) {
      console.error("Erro ao buscar Insumos:", error);
      res.status(500).json({ message: "Erro ao buscar insumos" });
    }
  }

  async inserir(req: Request, res: Response): Promise<void> {
    try {
      const dto = InsumoInserirSchema.parse(req.body);
      await this._InsumoService.inserir(dto);

      res.status(201).json({ message: "insumo criado com sucesso" });
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
    const controller = new InsumoController();
    
    router.get("/", controller.buscarTodos.bind(controller));
    router.post("/", controller.inserir.bind(controller)); 
    
    return router;
  }
}