import { string, z } from "zod";

// 1. Definir enum para status (se aplicável)
const StatusProducao = z.enum([
  "planejada",
  "em andamento",
  "concluída",
  "cancelada",
  "em plantio",
  "plantada",
  "colhida"
]);


export const ProducaoInserirSchema = z.object({
  quantidade: z.number()
    .positive("Quantidade deve ser positiva")
    .min(0.1, "Quantidade mínima não atingida"),
  status: z.string(), 
  produtoId: z.string().uuid("ID do produto inválido"),
  fazendaId: z.string().uuid("ID da fazenda inválido"),
 

});

export type ProducaoInserirDTO = z.infer<typeof ProducaoInserirSchema>;