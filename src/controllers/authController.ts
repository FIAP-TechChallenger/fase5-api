import { Request, Response } from "express";
import { z } from "zod";
import { authService } from "../services/authService";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Login (público)
export async function login(req: Request, res: Response) {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.errors });
    return;
  }

  const { email, password } = result.data;
  try {
    const authData = await authService.loginWithEmailAndPassword(
      email,
      password
    );
    res.status(200).json(authData);
  } catch (error: any) {
    res
      .status(401)
      .json({ message: "Credenciais inválidas", error: error?.response?.data });
  }
}

// Logout (protegido)
export async function logout(req: Request, res: Response) {
  try {
    const uid = req.user.uid;
    await authService.revokeUserTokens(uid);
    res.status(200).json({ message: "Logout forçado com sucesso" });
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Erro ao fazer logout", error: error.message });
  }
}
