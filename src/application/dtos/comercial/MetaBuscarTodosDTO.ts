import { z } from "zod";

export const MetaBuscarTodosSchema = z.object({
  limite: z.number().optional(),
  ultimoId: z.number().optional(),
  ultimoCriadaEm: z.coerce.date().optional(),
});

export type MetaBuscarTodosDTO = z.infer<typeof MetaBuscarTodosSchema>;
