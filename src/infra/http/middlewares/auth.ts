import { Request, Response, NextFunction } from "express";
import { FirebaseAuthProvider } from "@/infra/firebase/FirebaseAuthProvider";
import { CookieConstants } from "@/shared/constants/cookies.consts";

const authProvider = new FirebaseAuthProvider();

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

  if (!token && req.cookies?.[CookieConstants.cookieTokenName]) {
    token = req.cookies[CookieConstants.cookieTokenName];
  }

  if (!token) {
    res.status(401).json({ message: "Sem acesso" });
    return;
  }

  try {
    req.user = await authProvider.verifyToken(token);
    next();
  } catch (error) {
    res.status(401).json({ message: "Sem acesso" });
    return;
  }
}
