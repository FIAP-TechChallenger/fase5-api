import { Request, Response, Router } from "express";
import { AuthService } from "@/application/services/AuthService";
import { FirebaseAuthRepository } from "@/infra/repositories/FirebaseAuthRepository";
import { LoginDTO } from "../dtos/LoginDTO";
import { authenticate } from "../middlewares/auth";
import { LoginResponseDTO } from "@/application/dtos/LoginResponseDTO";

export class AuthController {
  private _authService = new AuthService(new FirebaseAuthRepository());

  async login(req: Request, res: Response): Promise<void> {
    try {
      const dto = LoginDTO.validate(req.body);
      const authData = await this._authService.login(dto.email, dto.password);

      res.cookie("accessToken", authData.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000, // 15 minutos
      });

      res.cookie("refreshToken", authData.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
      });

      res.status(200).json(authData);
    } catch (err: any) {
      res.status(400).json({ message: "Credenciais inválidas" });
    }
  }

  async getLoggedUser(req: Request, res: Response): Promise<void> {
    res.json(req.user.uid);
    return;
  }

  async refresh(req: Request, res: Response): Promise<void> {
    const refreshToken = req.body.refreshToken;

    if (
      !refreshToken ||
      typeof refreshToken !== "string" ||
      refreshToken.trim() === ""
    ) {
      res.status(400).json({ error: "refreshToken é obrigatório." });
      return;
    }

    try {
      const refreshResponse = await this._authService.refresh(refreshToken);
      res.status(200).json(refreshResponse);
    } catch (error: any) {
      res
        .status(401)
        .json({ message: "Falha ao renovar token", error: error.message });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user;
      if (!user || !user.uid) {
        res.status(401).json({ message: "Usuário não autenticado" });
        return;
      }

      await this._authService.revokeTokens(user.uid);

      res.status(200).json({ message: "Logout realizado com sucesso" });
    } catch (error: any) {
      res.status(500).json({
        message: "Erro interno ao realizar logout",
        error: error?.message || "Erro desconhecido",
      });
    }
  }

  static routes() {
    const router = Router();
    const controller = new AuthController();
    router.post("/login", controller.login.bind(controller));
    router.post("/refresh", controller.refresh.bind(controller));
    router.post("/logout", authenticate, controller.logout.bind(controller));
    router.post(
      "/getLoggedUser",
      authenticate,
      controller.getLoggedUser.bind(controller)
    );
    return router;
  }
}
