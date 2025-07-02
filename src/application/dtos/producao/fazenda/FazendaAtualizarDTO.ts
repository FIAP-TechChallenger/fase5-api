import { z } from "zod";
import { FazendaInserirSchema } from "./FazendaInserirDTO";


export const FazendaAtualizarSchema = FazendaInserirSchema.and(
  z.object({
    id: z.string().min(1, "ID é obrigatório"),
  })
);

export type FazendaAtualizarDTO = z.infer<typeof FazendaAtualizarSchema>;
