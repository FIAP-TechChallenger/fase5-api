import { z } from "zod";

export const MedidaBuscarTodosSchema = z.object({
  limite: z.number().optional().nullable(),
  ultimoId: z.string().optional().nullable(),
});

export type MedidaBuscarTodosDTO = z.infer<typeof MedidaBuscarTodosSchema>;
