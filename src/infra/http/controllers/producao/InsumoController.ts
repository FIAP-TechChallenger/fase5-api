// src/presentation/controllers/producao/FazendaController.ts
import { InsumoAtualizarSchema } from "@/application/dtos/producao/Insumo/InsumoAtualizarDTO";
import { InsumoBuscarTodosSchema } from "@/application/dtos/producao/Insumo/InsumoBuscarTodosDTO";
import { InsumoInserirSchema } from "@/application/dtos/producao/Insumo/InsumoInserirDTO";
import { InsumoService } from "@/application/services/producao/InsumoService";
import { MedidaService } from "@/application/services/producao/MedidaService";
import { FirebaseInsumoRepository } from "@/infra/repositories/producao/firebaseInsumoRepository";
import { FirebaseMedidaRepository } from "@/infra/repositories/producao/firebaseMedidaRepository";
import { Request, Response, Router } from "express";

import { z, ZodError } from "zod";

export class InsumoController {
  
  private _InsumoService: InsumoService;

  constructor() {
    const insumoRepository = new FirebaseInsumoRepository();
    const medidaRepository = new FirebaseMedidaRepository(); 
    const medidaService = new MedidaService(medidaRepository); 

    this._InsumoService = new InsumoService(insumoRepository, medidaRepository);; 
  }



  async buscarTodos(req: Request, res: Response): Promise<void> {
    try {
      const dto = InsumoBuscarTodosSchema.parse(req.body);
      const insumos = await this._InsumoService.buscarTodos(dto);
      res.status(200).json(insumos);
    } catch (error) {
      console.error("Erro ao buscar Insumos:", error);
      let message = "Erro ao buscar insumos";
      if (error instanceof ZodError) {
        message = error.message;
      }
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
  
  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const dto = InsumoAtualizarSchema.parse(req.body);
      await this._InsumoService.atualizar(dto);

      res.status(200).json({ message: "Insumo atualizado com sucesso" });
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
    const controller = new InsumoController();
    
    router.post("/", controller.buscarTodos.bind(controller));
    router.post("/inserir", controller.inserir.bind(controller)); 
    router.post("/atualizar", controller.atualizar.bind(controller));
    
    return router;
  }
}