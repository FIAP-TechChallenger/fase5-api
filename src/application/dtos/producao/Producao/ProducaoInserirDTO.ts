import { ProducaoStatusEnumZod } from "@/domain/types/producao.enum";
import { z } from "zod";

export const ProducaoInserirSchema = z.object({
  quantidadePlanejada: z
    .number()
    .positive("Quantidade deve ser positiva")
    .min(0.1, "Quantidade mínima não atingida"),
  precoPlanejado: z
    .number()
    .positive("Preço deve ser positivo")
    .optional(), 
  status: ProducaoStatusEnumZod,
  produtoId: z.string().uuid("ID do produto inválido"),
  fazendaId: z.string().uuid("ID da fazenda inválido"),
  lote: z.string().min(1, "Lote é obrigatório"),
  dataInicio: z.coerce.date(),
  dataFim: z.coerce.date(),
  insumos: z.array(
    z.object({
      insumoId: z.string().uuid("ID do insumo inválido"),
      quantidade: z
        .number()
        .positive("Quantidade deve ser positiva")
        .min(0.01, "Quantidade muito baixa"),
    })
  ),
  quantidadeColhida: z.number().optional(),
  perdas: z.number().optional(),
  custoProducao: z.number().optional(),
  precoFinal: z.number().optional(),
});
export type ProducaoInserirDTO = z.infer<typeof ProducaoInserirSchema>;
