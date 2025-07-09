import { z } from "zod";
import { ProdutoInserirSchema } from "./ProdutoInserirDTO";

export const ProdutoAtualizarSchema = ProdutoInserirSchema.and(
    z.object({
      id: z.string().min(1, "ID é obrigatório"),
    })
  );
  
  export type ProdutoAtualizarDTO = z.infer<typeof ProdutoAtualizarSchema>;