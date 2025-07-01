import { z } from "zod";
import { MetaInserirSchema } from "./MetaInserirDTO";

export const MetaAtualizarSchema = MetaInserirSchema.and(
  z.object({
    id: z.string().min(1, "ID é obrigatório"),
  })
);

export type MetaAtualizarDTO = z.infer<typeof MetaAtualizarSchema>;
