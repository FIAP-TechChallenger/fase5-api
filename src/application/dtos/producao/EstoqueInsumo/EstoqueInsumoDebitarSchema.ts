// src/application/dtos/producao/EstoqueInsumo/EstoqueInsumoDebitarDTO.ts
import { z } from "zod";

export const EstoqueInsumoDebitarSchema = z.object({
  insumoId: z.string().min(1, "ID do insumo é obrigatório"),
  quantidade: z.number().min(0.01, "Quantidade deve ser maior que zero"),
});

export type EstoqueInsumoDebitarDTO = z.infer<typeof EstoqueInsumoDebitarSchema>;