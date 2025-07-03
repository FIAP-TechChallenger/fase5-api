import { z } from "zod";

export const ProducaoBuscarTodosSchema = z.object({
  limite: z.number().optional().nullable(),
  ultimoId: z.string().optional().nullable(),
});

export type ProducaoBuscarTodosDTO = z.infer<typeof ProducaoBuscarTodosSchema>;
