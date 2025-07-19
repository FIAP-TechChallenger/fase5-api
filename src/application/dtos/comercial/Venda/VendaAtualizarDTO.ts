import { z } from "zod";
import { VendaInserirSchema } from "./VendaInserirDTO";

export const ItemVendaAtualizarSchema = z.object({
  id: z.string().min(1, "ID do item é obrigatório"),
  desconto: z.number().min(0).default(0),
  quantidade: z.number().min(1, "Quantidade deve ser maior que zero"),
  produtoId: z.string().min(1, "Produto é obrigatório"),
  fazendaId: z.string().optional(),
  precoUnitario: z.number().min(0, "Preço unitário deve ser positivo"),
  lucroUnitario: z.number().min(0, "Lucro unitário deve ser positivo"),
});

export const VendaAtualizarSchema = VendaInserirSchema.extend({
  id: z.string().min(1, "ID é obrigatório"),
  itens: z.array(ItemVendaAtualizarSchema).min(1, "Venda deve ter ao menos um item"),
});

export type VendaAtualizarDTO = z.infer<typeof VendaAtualizarSchema>;
