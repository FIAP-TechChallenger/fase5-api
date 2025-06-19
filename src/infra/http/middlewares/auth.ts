import { Request, Response, NextFunction } from "express";
import { FirebaseAuthProvider } from "@/infra/firebase/FirebaseAuthProvider";
import { Usuario } from "@/domain/entities/Usuario";
import { AuthService } from "@/application/services/AuthService";
import { FirebaseAuthRepository } from "@/infra/repositories/FirebaseAuthRepository";
import { AuthCookieService } from "@/application/services/AuthCookieService";

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
    await defineReqUser(req, token);
    next();
  } catch (error) {
    // Token inválido ou expirado
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      res.status(401).json({ message: "Token inválido ou expirado" });
      return;
    }

    try {
      const authService = new AuthService(new FirebaseAuthRepository());
      const refreshResponse = await authService.refresh(refreshToken);

      authCookieService.setToken(res, refreshResponse.token);
      authCookieService.setRefreshToken(res, refreshResponse.refreshToken);

      await defineReqUser(req, refreshResponse.token);
      next();
    } catch (refreshError) {
      res.status(401).json({ message: "Token inválido" });
    }
  }
}

async function defineReqUser(req: Request, token: string) {
  const decoded = await authProvider.verifyToken(token);
  req.user = new Usuario(decoded.uid, decoded.email || "", decoded.name);
}
