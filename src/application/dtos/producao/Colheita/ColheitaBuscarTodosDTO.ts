import { z } from "zod";

export const ColheitaBuscarTodosSchema = z.object({
  limite: z.number().optional().nullable(),
  ultimoId: z.string().optional().nullable(),
});

export type ColheitaBuscarTodosDTO = z.infer<typeof ColheitaBuscarTodosSchema>;
