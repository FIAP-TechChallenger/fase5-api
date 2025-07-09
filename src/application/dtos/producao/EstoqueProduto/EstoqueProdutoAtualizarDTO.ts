import { z } from "zod";
import { EstoqueProdutoInserirSchema } from "./EstoqueProdutoInserirDTO";

export const EstoqueProdutoAtualizarSchema = EstoqueProdutoInserirSchema.and(
    z.object({
      id: z.string().min(1, "ID é obrigatório"),
    })
  );
  
  export type EstoqueProdutoAtualizarDTO = z.infer<typeof EstoqueProdutoAtualizarSchema>;