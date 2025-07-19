import { VendaStatusEnum, VendaStatusEnumZod } from "@/domain/types/venda.enum";
import { z } from "zod";


export const ItemVendaInserirSchema = z.object({
  desconto: z.number().min(0).default(0),
  quantidade: z.number().min(1, "Quantidade deve ser maior que zero"),
  produtoId: z.string().min(1, "Produto é obrigatório"),
  fazendaId: z.string().optional().nullable(),
  precoUnitario: z.number().min(0, "Preço unitário deve ser positivo"),
  lucroUnitario: z.number().min(0, "Lucro unitário deve ser positivo"),
});

export const VendaInserirSchema = z.object({
  dataVenda: z.coerce.date({
    required_error: "A data da venda é obrigatória",
  }),
  cliente: z.string().min(1, "Cliente é obrigatório"),
  imposto: z.number().min(0).optional(),
  valorTotal: z.number().min(0, "Valor total deve ser positivo"),
  status: VendaStatusEnumZod,
  itens: z.array(ItemVendaInserirSchema).min(1, "Venda deve ter ao menos um item"),
});

export type VendaInserirDTO = z.infer<typeof VendaInserirSchema>;