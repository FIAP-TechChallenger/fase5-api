import { Request, Response, Router } from "express";
import { AuthService } from "@/application/services/AuthService";
import { FirebaseAuthRepository } from "@/infra/repositories/FirebaseAuthRepository";
import { CriarUsuarioDTO } from "../dtos/CriarUsuarioDTO";

export class UsuarioController {
  private _authService = new AuthService(new FirebaseAuthRepository());

  async register(req: Request, res: Response) {
    try {
      const dto = CriarUsuarioDTO.validate(req.body);
      await this._authService.register(dto.email, dto.password);
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
    router.post("/register", controller.register.bind(controller));
    return router;
  }
}
