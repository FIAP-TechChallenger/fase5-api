import { z } from "zod";

export const VendaBuscarTodosSchema = z.object({
  limite: z.number().optional().nullable(),
  ultimoId: z.string().optional().nullable(),
});

export type VendaBuscarTodosDTO = z.infer<typeof VendaBuscarTodosSchema>;
