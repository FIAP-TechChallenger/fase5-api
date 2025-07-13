import { z } from "zod";

export const NotificacaoBuscarTodasSchema = z.object({
  limite: z.number().optional().nullable(),
  ultimoId: z.string().optional().nullable(),
});

export type NotificacaoBuscarTodasDTO = z.infer<
  typeof NotificacaoBuscarTodasSchema
>;
