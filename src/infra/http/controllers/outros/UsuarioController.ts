import { Request, Response, Router } from "express";
import { UsuarioCadastroService } from "@/application/services/outros/UsuarioCadastroService";
import { ResendEmailService } from "@/infra/email/ResendEmailService";
import { FirebaseUsuarioRepository } from "@/infra/repositories/outros/FirebaseUsuarioRepository";
import { UsuarioInserirSchema } from "@/application/dtos/outros/UsuarioInserirDTO";
import { UsuarioSetorEnum } from "@/domain/types/usuario.enum";
import { UsuarioConsultaService } from "@/application/services/outros/UsuarioConsultaService";
import { UsuarioBuscarTodosSchema } from "@/application/dtos/outros/UsuarioBuscarTodosDTO";

export class UsuarioController {
  private _usuarioRepo = new FirebaseUsuarioRepository();
  private _usuarioCadastro = new UsuarioCadastroService(
    new ResendEmailService(),
    this._usuarioRepo
  );
  private _usuarioConsulta = new UsuarioConsultaService(this._usuarioRepo);

  async buscarTodos(req: Request, res: Response) {
    try {
      if (req.user.setor !== UsuarioSetorEnum.ADMIN) {
        res.status(401).json({ message: "Usuário sem autorização" });
        return;
      }
      const dto = UsuarioBuscarTodosSchema.parse(req.body);
      const dados = await this._usuarioConsulta.buscarTodos(dto);
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
      if (req.user.setor !== UsuarioSetorEnum.ADMIN) {
        res.status(401).json({ message: "Usuário sem autorização" });
        return;
      }

      const dto = UsuarioInserirSchema.parse(req.body);
      await this._usuarioCadastro.inserir(dto);
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
    router.post("/", controller.buscarTodos.bind(controller));
    router.post("/inserir", controller.inserir.bind(controller));
    return router;
  }
}
