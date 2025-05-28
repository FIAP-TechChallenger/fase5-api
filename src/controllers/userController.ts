import { Request, Response } from "express";
import { z } from "zod";
import { authService } from "../services/authService";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function register(req: Request, res: Response) {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.errors });
    return;
  }

  const { email, password } = result.data;

  try {
    const userRecord = await authService.registerUser(email, password);
    res.status(201).json({ uid: userRecord.uid, email: userRecord.email });
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Erro ao registrar usuário", error: error.message });
  }
}
