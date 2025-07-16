import { z } from "zod";
import { ProducaoInserirSchema } from "./ProducaoInserirDTO";

export const ProducaoAtualizarSchema = ProducaoInserirSchema.and(

  z.object({

    id: z.string().min(1, "ID é obrigatório"),
  })
);

export type ProducaoAtualizarDTO = z.infer<typeof ProducaoAtualizarSchema>;
