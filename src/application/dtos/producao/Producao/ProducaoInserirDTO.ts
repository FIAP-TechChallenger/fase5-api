import { ProducaoStatusEnumZod } from "@/domain/types/producao.enum";
import { z } from "zod";

export const ProducaoInserirSchema = z.object({
  quantidade: z
    .number()
    .positive("Quantidade deve ser positiva")
    .min(0.1, "Quantidade mínima não atingida"),
  status: ProducaoStatusEnumZod,
  produtoId: z.string().uuid("ID do produto inválido"),
  fazendaId: z.string().uuid("ID da fazenda inválido"),
});

export type ProducaoInserirDTO = z.infer<typeof ProducaoInserirSchema>;
