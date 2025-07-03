import { z } from "zod";

export const EstoqueInsumoBuscarTodosSchema = z.object({
  limite: z.number().optional().nullable(),
  ultimoId: z.string().optional().nullable(),
});

export type EstoqueInsumoBuscarTodosDTO = z.infer<typeof EstoqueInsumoBuscarTodosSchema>;
