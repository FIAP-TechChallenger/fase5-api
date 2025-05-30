import { Request, Response, NextFunction } from "express";
import { FirebaseAuthProvider } from "@/infra/firebase/FirebaseAuthProvider";
import { Usuario } from "@/domain/entities/Usuario";

const authProvider = new FirebaseAuthProvider();

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const decoded = await authProvider.verifyToken(token);
    req.user = new Usuario(decoded.uid, decoded.email || "", decoded.name);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}
