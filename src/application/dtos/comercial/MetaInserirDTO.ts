import { z } from "zod";
import {
  MetaTipoEnumZod,
  MetaCalculoPorEnumZod,
} from "@/domain/types/zod.enums";

export const MetaInserirSchema = z.object({
  tipo: MetaTipoEnumZod,
  calculoPor: MetaCalculoPorEnumZod,
  titulo: z.string().min(1, "Título é obrigatório"),
  descricao: z.string().optional(),
  valorAlvo: z.number().positive("O valor alvo deve ser positivo"),
  dataInicio: z.coerce.date(),
  dataFim: z.coerce.date(),
  fazendaId: z.string().optional(),
});

export type MetaInserirDTO = z.infer<typeof MetaInserirSchema>;
