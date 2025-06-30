import { z } from "zod";

export const EstoqueInsumoInserirSchema = z.object({
    insumoId: z.string().min(1, "insumo deve ter pelo menos 1 caracteres").optional(),
    quantidade: z.number()
    .positive("Quantidade deve ser positiva")
    .min(1, "Quantidade mínima: 1"),
    preco: z.number()
    .positive("Preço deve ser positivo")
    .min(0.01, "Preço mínimo: 0.01"),
    criadoEm: z.coerce.date()
});

export type EstoqueInsumoInserirDTO = z.infer<typeof EstoqueInsumoInserirSchema>;