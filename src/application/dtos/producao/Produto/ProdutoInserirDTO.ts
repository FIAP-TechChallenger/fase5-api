import { z } from "zod";

export const ProdutoInserirSchema = z.object({
    nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    unidadeMedidaId: z.string().uuid("ID de medida inválido"), 
  
});

export type ProdutoInserirDTO = z.infer<typeof ProdutoInserirSchema>;