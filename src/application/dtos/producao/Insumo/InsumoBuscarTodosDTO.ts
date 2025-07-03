import { z } from "zod";

export const InsumoBuscarTodosSchema = z.object({
  limite: z.number().optional().nullable(),
  ultimoId: z.string().optional().nullable(),
});

export type InsumoBuscarTodosDTO = z.infer<typeof InsumoBuscarTodosSchema>;
