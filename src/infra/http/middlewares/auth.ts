import { Request, Response, NextFunction } from "express";
import { FirebaseAuthProvider } from "@/infra/firebase/FirebaseAuthProvider";
import { Usuario } from "@/domain/entities/outros/Usuario";
import { AuthService } from "@/application/services/outros/AuthService";
import { FirebaseAuthRepository } from "@/infra/repositories/outros/FirebaseAuthRepository";
import { AuthCookieService } from "@/application/services/outros/AuthCookieService";
import { FirebaseUsuarioRepository } from "@/infra/repositories/outros/FirebaseUsuarioRepository";

const authProvider = new FirebaseAuthProvider();
const authCookieService = new AuthCookieService();

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token: string | undefined;

  const authHeader = req.headers["authorization"];
  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token && req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    res.status(401).json({ message: "Sem acesso" });
    return;
  }

  try {
    req.user = await authProvider.verifyToken(token);
    next();
  } catch (error) {
    // Token inválido ou expirado
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      res.status(401).json({ message: "Token inválido ou expirado" });
      return;
    }

    try {
      const authService = new AuthService(
        new FirebaseAuthRepository(),
        new FirebaseUsuarioRepository()
      );
      const refreshResponse = await authService.refresh(refreshToken);

      authCookieService.setToken(res, refreshResponse.token);
      authCookieService.setRefreshToken(res, refreshResponse.refreshToken);

      req.user = await authProvider.verifyToken(refreshResponse.token);
      next();
    } catch (refreshError) {
      res.status(401).json({ message: "Token inválido" });
    }
  }
}
