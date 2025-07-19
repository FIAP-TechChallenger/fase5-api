// src/presentation/controllers/producao/FazendaController.ts
import { FazendaAtualizarSchema } from "@/application/dtos/producao/fazenda/FazendaAtualizarDTO";
import { FazendaBuscarTodosSchema } from "@/application/dtos/producao/fazenda/FazendaBuscarTodosDTO";
import { FazendaInserirSchema } from "@/application/dtos/producao/fazenda/FazendaInserirDTO";
import { FazendaService } from "@/application/services/producao/Fazendaservice";
import { FirebaseFazendaRepository } from "@/infra/repositories/producao/firebaseFazendaRepository";
import { Request, Response, Router } from "express";
import { z, ZodError } from "zod";
import { verificarPermissaoSetor } from "../../middlewares/SetorMiddleware";
import { UsuarioSetorEnum } from "@/domain/types/usuario.enum";

export class FazendaController {
  private _fazendaService = new FazendaService(new FirebaseFazendaRepository());

  async buscarTodos(req: Request, res: Response): Promise<void> {
    try {
      const dto = FazendaBuscarTodosSchema.parse(req.body);
      const fazendas = await this._fazendaService.buscarTodos(dto);
      res.status(200).json(fazendas);
    } catch (error) {
      console.error("Erro real ao buscar fazendas =>", error); // <-- ADICIONE ISSO
      let message = "Erro ao buscar fazendas";
      if (error instanceof ZodError) {
        message = error.message;
      }
      res.status(500).json({ message });
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
          erros: error.errors.map((err) => ({
            campo: err.path.join("."),
            mensagem: err.message,
          })),
        });
        return;
      }
      console.error("Erro ao inserir fazenda:", error);
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  }
  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const dto = FazendaAtualizarSchema.parse(req.body);
      await this._fazendaService.atualizar(dto);

      res.status(200).json({ message: "fazenda atualizada com sucesso" });
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
    const controller = new FazendaController();
    router.post("/", controller.buscarTodos.bind(controller));

    // router.use(
    //   verificarPermissaoSetor(UsuarioSetorEnum.ADMIN, UsuarioSetorEnum.PRODUCAO)
    // );
    router.post("/inserir", controller.inserir.bind(controller));
    router.post("/atualizar", controller.atualizar.bind(controller));

    return router;
  }
}
