import { Request, Response, Router } from "express";
import { z } from "zod";
import { AuthService } from "@/application/services/AuthService";
import { FirebaseAuthRepository } from "@/infra/repositories/FirebaseAuthRepository";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export class AuthController {
  private _authService = new AuthService(new FirebaseAuthRepository());

  async login(req: Request, res: Response): Promise<void> {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: result.error.errors });
      return;
    }

    const { email, password } = result.data;

    try {
      const authData = await this._authService.login(email, password);
      res.status(200).json(authData);
    } catch (error: any) {
      res.status(401).json({
        message: "Credenciais inválidas",
        error: error?.response?.data || error.message,
      });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      const uid = req.user.uid;
      await this._authService.revokeTokens(uid);
      res.status(200).json({ message: "Logout forçado com sucesso" });
    } catch (error: any) {
      res.status(400).json({
        message: "Erro ao fazer logout",
        error: error.message,
      });
    }
  }

  static routes() {
    const router = Router();
    const controller = new AuthController();
    router.post("/login", controller.login.bind(controller));
    router.post("/logout", controller.logout.bind(controller));
    return router;
  }
}
