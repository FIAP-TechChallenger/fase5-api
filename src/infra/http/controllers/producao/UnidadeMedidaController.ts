// src/presentation/controllers/producao/FazendaController.ts
import { MedidaInserirSchema } from "@/application/dtos/producao/MedidaInserirDTO";
import { MedidaService } from "@/application/services/producao/MedidaService";
import { FirebaseMedidaRepository } from "@/infra/repositories/producao/firebaseMedidaRepository";
import { Request, Response, Router } from "express";

import { z } from "zod";

export class UnidadeMedidaController {
  private _UnidadeMedidaService = new MedidaService(new FirebaseMedidaRepository());


  async buscarTodos(req: Request, res: Response): Promise<void> {
    try {
      const fazendas = await this._UnidadeMedidaService.getAll();
      res.status(200).json(fazendas);
    } catch (error) {
      console.error("Erro ao buscar unidade de medidas:", error);
      res.status(500).json({ message: "Erro ao buscar unidade de medidas" });
    }
  }

  async inserir(req: Request, res: Response): Promise<void> {
    try {
      const dto = MedidaInserirSchema.parse(req.body);
      await this._UnidadeMedidaService.inserir(dto);

      res.status(201).json({ message: "unidade de medidas criado com sucesso" });
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
    const controller = new  UnidadeMedidaController();
    
    router.get("/", controller.buscarTodos.bind(controller));
    router.post("/", controller.inserir.bind(controller)); 
    
    return router;
  }
}