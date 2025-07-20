// src/infra/http/controllers/comercial/VendaController.ts
import { Request, Response, Router } from "express";
import { VendaService } from "@/application/services/comercial/VendaService";
import { FirebaseVendaRepository } from "@/infra/repositories/comercial/FirebaseVendaRepository";
import { VendaBuscarTodosSchema } from "@/application/dtos/comercial/Venda/VendaBuscarTodosDTO";
import { VendaInserirSchema } from "@/application/dtos/comercial/Venda/VendaInserirDTO";
import { VendaAtualizarSchema } from "@/application/dtos/comercial/Venda/VendaAtualizarDTO";
import { UsuarioSetorEnum } from "@/domain/types/usuario.enum";
import { verificarPermissaoSetor } from "../../middlewares/SetorMiddleware";
import { z, ZodError } from "zod";
import { FirebaseProdutoRepository } from "@/infra/repositories/producao/firebaseProdutoRepository";
import { DashboardComercialService } from "@/application/services/outros/dashboard/DashboardComercialService";
import { FirebaseDashboardComercialRepository } from "@/infra/repositories/outros/FirebaseDashboardComercialRepository";

export class VendaController {
  private _vendaService = new VendaService(
    new FirebaseVendaRepository(),
    new FirebaseProdutoRepository(),
    new DashboardComercialService(
      new FirebaseDashboardComercialRepository(),
      new FirebaseProdutoRepository())

  );

  async buscarTodos(req: Request, res: Response): Promise<void> {
    try {
      const dto = VendaBuscarTodosSchema.parse(req.body);
      const vendas = await this._vendaService.buscarTodos(dto);
      res.status(200).json(vendas);
    } catch (error) {
      let message = "Erro ao buscar vendas";
      console.log("error", error)
      if (error instanceof ZodError) {
        message = error.message;
      }
      res.status(500).json({ message });
    }
  }

  async inserir(req: Request, res: Response): Promise<void> {
    try {
      const dto = VendaInserirSchema.parse(req.body);
      await this._vendaService.inserir(dto);
      res.status(201).json({ message: "Venda criada com sucesso" });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Erro de validação",
          erros: error.errors,
        });
        return;
      }
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  }

  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const dto = VendaAtualizarSchema.parse(req.body);
      await this._vendaService.atualizar(dto);
      res.status(200).json({ message: "Venda atualizada com sucesso" });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Erro de validação",
          erros: error.errors,
        });
        return;
      }
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  }

  static routes() {
    const router = Router();
    const controller = new VendaController();

    router.use(
      verificarPermissaoSetor(
        UsuarioSetorEnum.ADMIN,
        UsuarioSetorEnum.COMERCIAL
      )
    );
    router.post("/", controller.buscarTodos.bind(controller));
    router.post("/inserir", controller.inserir.bind(controller));
    router.post("/atualizar", controller.atualizar.bind(controller));

    return router;
  }
}