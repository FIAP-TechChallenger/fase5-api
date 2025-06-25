// src/presentation/controllers/producao/FazendaController.ts
import { FazendaInserirSchema } from "@/application/dtos/producao/FazendaInserirDTO";
import { FazendaService } from "@/application/services/producao/Fazendaservice";
import { FirebaseFazendaRepository } from "@/infra/repositories/producao/firebaseFazendaRepository";
import { Request, Response, Router } from "express";

import { z } from "zod";

export class FazendaController {
  private _fazendaService = new FazendaService(new FirebaseFazendaRepository());


  async buscarTodos(req: Request, res: Response): Promise<void> {
    try {
      const fazendas = await this._fazendaService.getAll();
      res.status(200).json(fazendas);
    } catch (error) {
      console.error("Erro ao buscar fazendas:", error);
      res.status(500).json({ message: "Erro ao buscar fazendas" });
    }
  }

  async inserir(req: Request, res: Response): Promise<void> {
    try {
      const dto = FazendaInserirSchema.parse(req.body);
      await this._fazendaService.inserir(dto);

      res.status(201).json({ message: "Fazenda criada com sucesso" });
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
      console.error("Erro ao inserir fazenda:", error);
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  }


  static routes() {
    const router = Router();
    const controller = new FazendaController();
    router.get("/", controller.buscarTodos.bind(controller));
    router.post("/inserir", controller.inserir.bind(controller));
  
    
    return router;
  }
}