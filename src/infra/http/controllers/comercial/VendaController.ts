import { Request, Response, Router } from "express";
import { VendaBuscarTodosSchema } from "@/application/dtos/comercial/Venda/VendaBuscarTodosDTO";
import { VendaInserirSchema } from "@/application/dtos/comercial/Venda/VendaInserirDTO";
import { VendaAtualizarSchema } from "@/application/dtos/comercial/Venda/VendaAtualizarDTO";
import { UsuarioSetorEnum } from "@/domain/types/usuario.enum";
import { verificarPermissaoSetor } from "../../middlewares/SetorMiddleware";
import { z, ZodError } from "zod";
import { container } from "@/infra/container/container";

export class VendaController {
  async buscarTodos(req: Request, res: Response): Promise<void> {
    try {
      const dto = VendaBuscarTodosSchema.parse(req.body);
      const vendas = await container.vendaService.buscarTodos(dto);
      res.status(200).json(vendas);
    } catch (error) {
      let message = "Erro ao buscar vendas";
      console.log("error", error);
      if (error instanceof ZodError) {
        message = error.message;
      }
      res.status(500).json({ message });
    }
  }

  async inserir(req: Request, res: Response): Promise<void> {
    try {
      const dto = VendaInserirSchema.parse(req.body);
      await container.vendaService.inserir(dto);
      res.status(201).json({ message: "Venda criada com sucesso" });
    } catch (error: any) {
      console.log("ERRO AO INSERIR VENDA:", error); // <-- ADICIONE ESTA LINHA
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
      await container.vendaService.atualizar(dto);
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
