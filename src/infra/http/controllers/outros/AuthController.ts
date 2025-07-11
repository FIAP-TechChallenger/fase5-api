import { Request, Response, Router } from "express";
import { authenticate } from "@/infra/http/middlewares/auth";
import { LoginSchema } from "../../dtos/LoginDTO";
import { container } from "@/infra/container/container";

export class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const dto = LoginSchema.parse(req.body);
      const authData = await container.authService.login(
        dto.email,
        dto.password
      );

      container.authCookieService.setToken(res, authData.token);
      container.authCookieService.setRefreshToken(res, authData.refreshToken);

      res.status(200).json(authData);
    } catch (err: any) {
      res.status(400).json({ message: "Credenciais inválidas" });
    }
  }

  async getLoggedUser(req: Request, res: Response): Promise<void> {
    res.json(req.user.id);
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
      const refreshResponse = await container.authService.refresh(refreshToken);

      container.authCookieService.setToken(res, refreshResponse.token);
      container.authCookieService.setRefreshToken(
        res,
        refreshResponse.refreshToken
      );

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
      if (!user || !user.id) {
        res.status(401).json({ message: "Usuário não autenticado" });
        return;
      }

      container.authCookieService.clearToken(res);
      container.authCookieService.clearRefreshToken(res);
      await container.authService.revokeTokens(user.id);

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
