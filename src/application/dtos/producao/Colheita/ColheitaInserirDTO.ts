import { z } from "zod";

export const ColheitaInserirSchema = z.object({
  quantidadeColhida: z.number()
    .positive("Quantidade colhida deve ser positiva")
    .min(1, "Quantidade colhida mínima: 1"),
  perdas: z.number()
    .min(0, "Perdas não podem ser negativas"),
  custoProducao: z.number()
    .min(0, "Custo de produção não pode ser negativo")
    .optional(),
  preco: z.number()
    .positive("Preço deve ser positivo")
    .min(0.01, "Preço mínimo: 0.01"),
  producaoId: z.string()
    .min(1, "producaoId deve ter pelo menos 1 caractere"),
  dataInicio: z.string()
    .min(1, "dataInicio é obrigatória"),
  dataFim: z.string()
    .min(1, "dataFim é obrigatória"),
});

export type ColheitaInserirDTO = z.infer<typeof ColheitaInserirSchema>;