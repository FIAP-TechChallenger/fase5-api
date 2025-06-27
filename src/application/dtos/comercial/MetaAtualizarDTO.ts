import { z } from "zod";
import { MetaInserirSchema } from "./MetaInserirDTO";

export const MetaAtualizarSchema = MetaInserirSchema.extend({
  id: z.string().min(1, "ID é obrigatório"),
});

export type MetaAtualizarDTO = z.infer<typeof MetaAtualizarSchema>;
