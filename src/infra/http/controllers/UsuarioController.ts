import { Request, Response, Router } from "express";
import { z } from "zod";
import { AuthService } from "@/application/services/AuthService";
import { FirebaseAuthRepository } from "@/infra/repositories/FirebaseAuthRepository";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export class UsuarioController {
  private _authService = new AuthService(new FirebaseAuthRepository());

  async register(req: Request, res: Response) {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: result.error.errors });
      return;
    }

    const { email, password } = result.data;

    try {
      const userRecord = await this._authService.register(email, password);
      res.status(201).json({ uid: userRecord.uid, email: userRecord.email });
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
