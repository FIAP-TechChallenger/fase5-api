import { z } from "zod";
import { ColheitaInserirSchema } from "./ColheitaInserirDTO";

export const ColheitaAtualizarSchema = ColheitaInserirSchema.and(
  z.object({
    id: z.string().min(1, "ID é obrigatório"),
  })
);
export type ColheitaAtualizarDTO = z.infer<typeof ColheitaAtualizarSchema>; 