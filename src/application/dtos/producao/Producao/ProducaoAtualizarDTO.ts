import { ProducaoStatusEnumZod } from "@/domain/types/producao.enum";
import { z } from "zod";
// Schema independente para atualização
export const ProducaoAtualizarSchema = z.object({
  id: z.string().min(1, "ID é obrigatório"),
  quantidade: z
    .number()
    .positive("Quantidade deve ser positiva")
    .min(0.1, "Quantidade mínima não atingida")
    .optional(),
  status: ProducaoStatusEnumZod.optional().optional(),
});

export type ProducaoAtualizarDTO = z.infer<typeof ProducaoAtualizarSchema>;
