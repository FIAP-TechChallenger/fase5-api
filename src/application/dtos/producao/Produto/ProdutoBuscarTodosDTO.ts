import { z } from "zod";

export const ProdutoBuscarTodosSchema = z.object({
  limite: z.number().optional().nullable(),
  ultimoId: z.string().optional().nullable(),
});

export type ProdutoBuscarTodosDTO = z.infer<typeof ProdutoBuscarTodosSchema>;
