import { z } from "zod";
import {
  MetaTipoEnumZod,
  MetaCalculoPorEnumZod,
} from "@/domain/types/zod.enums";
import { MetaValidation } from "@/domain/validators/comercial/meta.validation";

export const MetaInserirSchemaBase = z.object({
  tipo: MetaTipoEnumZod,
  calculoPor: MetaCalculoPorEnumZod,
  titulo: z.string().min(1, "Título é obrigatório"),
  descricao: z.string().optional(),
  valorAlvo: z.number().positive("O valor alvo deve ser positivo"),
  dataInicio: z.coerce.date(),
  dataFim: z.coerce.date(),
  fazendaId: z.string().optional(),
  vendaId: z.string().optional(),
  producaoId: z.string().optional(),
});

export const MetaInserirSchema = MetaInserirSchemaBase.superRefine(
  MetaValidation.validarTipoDependencias
);

export type MetaInserirDTO = z.infer<typeof MetaInserirSchema>;
