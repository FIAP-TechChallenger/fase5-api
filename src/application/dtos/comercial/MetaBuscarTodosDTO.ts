import { z } from "zod";

export const MetaBuscarTodosSchema = z.object({
  limite: z.number().optional().nullable(),
  ultimoId: z.string().optional().nullable(),
});

export type MetaBuscarTodosDTO = z.infer<typeof MetaBuscarTodosSchema>;
