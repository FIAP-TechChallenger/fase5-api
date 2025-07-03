import { z } from "zod";

export const EstoqueProdutoInserirSchema = z.object({
    produtoId: z.string().min(1, "produto deve ter pelo menos 1 caracteres"),
    quantidade: z.number()
    .positive("Quantidade deve ser positiva")
    .min(1, "Quantidade mínima: 1"),
    preco: z.number()
    .positive("Preço deve ser positivo")
    .min(0.01, "Preço mínimo: 0.01"),
   
});

export type EstoqueProdutoInserirDTO = z.infer<typeof EstoqueProdutoInserirSchema>;