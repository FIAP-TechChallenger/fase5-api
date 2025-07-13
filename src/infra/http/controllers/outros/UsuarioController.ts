import { Request, Response, Router } from "express";
import { UsuarioInserirSchema } from "@/application/dtos/outros/usuario/UsuarioInserirDTO";
import { UsuarioSetorEnum } from "@/domain/types/usuario.enum";
import { UsuarioBuscarTodosSchema } from "@/application/dtos/outros/usuario/UsuarioBuscarTodosDTO";
import { verificarPermissaoSetor } from "../../middlewares/SetorMiddleware";
import { container } from "@/infra/container/container";

export class UsuarioController {
  async buscarTodos(req: Request, res: Response) {
    try {
      const dto = UsuarioBuscarTodosSchema.parse(req.body);
      const dados = await container.usuarioConsultaService.buscarTodos(dto);
      res.status(201).json(dados);
    } catch (error: any) {
      res.status(400).json({
        message: "Erro ao buscar todos os usuários",
        error: error.message,
      });
    }
  }

  async inserir(req: Request, res: Response) {
    try {
      const dto = UsuarioInserirSchema.parse(req.body);
      await container.usuarioCadastroService.inserir(dto);
      res.status(201).json({ message: "Usuario cadastrado com sucesso." });
    } catch (error: any) {
      res
        .status(400)
        .json({ message: "Erro ao registrar usuário", error: error.message });
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const dto = UsuarioInserirSchema.parse(req.body);
      await container.usuarioCadastroService.inserir(dto);
      res.status(201).json({ message: "Usuario cadastrado com sucesso." });
    } catch (error: any) {
      res
        .status(400)
        .json({ message: "Erro ao registrar usuário", error: error.message });
    }
  }

  async recuperarSenha(req: Request, res: Response) {
    try {
      const usuarioId = req.body?.usuarioId;
      if (!usuarioId) {
        res
          .status(401)
          .json({ message: "Necessário especificar 'usuarioId'." });
        return;
      }

      await container.usuarioCadastroService.recuperarSenha(usuarioId);
      res.status(201).json({ message: "Usuario cadastrado com sucesso." });
    } catch (error: any) {
      res
        .status(400)
        .json({ message: "Erro ao registrar usuário", error: error.message });
    }
  }

  static routes() {
    const router = Router();
    const controller = new UsuarioController();
    router.use(verificarPermissaoSetor(UsuarioSetorEnum.ADMIN));
    router.post("/", controller.buscarTodos.bind(controller));
    router.post("/inserir", controller.inserir.bind(controller));
    router.post("/atualizar", controller.atualizar.bind(controller));
    router.post("/recuperarSenha", controller.recuperarSenha.bind(controller));
    return router;
  }
}
