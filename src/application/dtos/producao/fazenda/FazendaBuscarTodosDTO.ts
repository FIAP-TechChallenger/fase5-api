import { z } from "zod";

export const FazendaBuscarTodosSchema = z.object({
  limite: z.number().optional().nullable(),
  ultimoId: z.string().optional().nullable(),
});

export type FazendaBuscarTodosDTO = z.infer<typeof FazendaBuscarTodosSchema>;
