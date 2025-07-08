import { z } from "zod";

export const UsuarioBuscarTodosSchema = z.object({
  limite: z.number().optional().nullable(),
  ultimoId: z.string().optional().nullable(),
});

export type UsuarioBuscarTodosDTO = z.infer<typeof UsuarioBuscarTodosSchema>;
