import { Request, Response, NextFunction } from "express";
import { FirebaseAuthProvider } from "@/infra/firebase/FirebaseAuthProvider";
import { Usuario } from "@/domain/entities/Usuario";

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

  if (!token && req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    res.status(401).json({ message: "Sem acesso" });
    return;
  }

  try {
    const decoded = await authProvider.verifyToken(token);
    req.user = new Usuario(decoded.uid, decoded.email || "", decoded.name);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}
