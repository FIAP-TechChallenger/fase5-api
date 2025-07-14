import { ProducaoStatusEnumZod } from "@/domain/types/producao.enum";
import { z } from "zod";
// Schema independente para atualização
export const ProducaoAtualizarSchema = z.object({
  id: z.string().uuid("ID da produção inválido"),
  quantidadePlanejada: z
    .number()
    .positive("Quantidade deve ser positiva")
    .min(0.1, "Quantidade mínima não atingida")
    .optional(),
  precoPlanejado: z
    .number()
    .positive("Preço deve ser positivo")
    .optional(),
  status: ProducaoStatusEnumZod.optional(),
  lote: z.string().min(1, "Lote inválido").optional(),
  produtoId: z.string().uuid("ID do produto inválido").optional(),
  fazendaId: z.string().uuid("ID da fazenda inválido").optional(),
  dataInicio: z.coerce.date().optional(),
  dataFim: z.coerce.date().optional(),
  colheitaId: z.string().uuid("ID da colheita inválido").optional(),
  insumos: z
    .array(
      z.object({
        insumoId: z.string().uuid("ID do insumo inválido"),
        quantidade: z
          .number()
          .positive("Quantidade deve ser positiva")
          .min(0.01, "Quantidade muito baixa"),
      })
    )
    .optional(),
});
export type ProducaoAtualizarDTO = z.infer<typeof ProducaoAtualizarSchema>;
