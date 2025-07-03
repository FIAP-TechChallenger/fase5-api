import { z } from "zod";

export const EstoqueProdutoBuscarTodosSchema = z.object({
  limite: z.number().optional().nullable(),
  ultimoId: z.string().optional().nullable(),
});

export type EstoqueProdutoBuscarTodosDTO = z.infer<typeof EstoqueProdutoBuscarTodosSchema>;
