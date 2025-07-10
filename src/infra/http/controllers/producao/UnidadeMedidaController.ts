// src/presentation/controllers/producao/FazendaController.ts
import { MedidaAtualizarSchema } from "@/application/dtos/producao/Medida/MedidaAtualizarDTO";
import { MedidaBuscarTodosSchema } from "@/application/dtos/producao/Medida/MedidaBuscarTodosDTO";
import { MedidaInserirSchema } from "@/application/dtos/producao/Medida/MedidaInserirDTO";
import { MedidaService } from "@/application/services/producao/MedidaService";
import { FirebaseMedidaRepository } from "@/infra/repositories/producao/firebaseMedidaRepository";
import { Request, Response, Router } from "express";

import { z, ZodError } from "zod";
import { verificarPermissaoSetor } from "../../middlewares/SetorMiddleware";
import { UsuarioSetorEnum } from "@/domain/types/usuario.enum";

export class UnidadeMedidaController {
  private _UnidadeMedidaService = new MedidaService(
    new FirebaseMedidaRepository()
  );

  async buscarTodos(req: Request, res: Response): Promise<void> {
    try {
      const dto = MedidaBuscarTodosSchema.parse(req.body);
      const medidas = await this._UnidadeMedidaService.buscarTodos(dto);
      res.status(200).json(medidas);
    } catch (error) {
      console.error("Erro ao buscar unidade de medidas:", error);
      let message = "Erro ao buscar medidas";
      if (error instanceof ZodError) {
        message = error.message;
      }
      res.status(500).json({ message: "Erro ao buscar unidade de medidas" });
    }
  }

  async inserir(req: Request, res: Response): Promise<void> {
    try {
      const dto = MedidaInserirSchema.parse(req.body);
      await this._UnidadeMedidaService.inserir(dto);

      res
        .status(201)
        .json({ message: "unidade de medidas criado com sucesso" });
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
      const dto = MedidaAtualizarSchema.parse(req.body);
      await this._UnidadeMedidaService.atualizar(dto);

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
    const controller = new UnidadeMedidaController();

    router.post("/", controller.buscarTodos.bind(controller));

    router.use(
      verificarPermissaoSetor(UsuarioSetorEnum.ADMIN, UsuarioSetorEnum.PRODUCAO)
    );
    router.post("/inserir", controller.inserir.bind(controller));
    router.post("/atualizar", controller.atualizar.bind(controller));

    return router;
  }
}
