import { z } from "zod";
import {
  MetaTipoEnumZod,
  MetaCalculoPorEnumZod,
} from "@/domain/types/meta.enum";
import { DateUtils } from "@/shared/utils/date.utils";

export const MetaInserirBaseSchema = z.object({
  tipo: MetaTipoEnumZod,
  calculoPor: MetaCalculoPorEnumZod,
  titulo: z.string().min(1, "Título é obrigatório"),
  descricao: z.string().optional().nullable(),
  valorAlvo: z.number().positive("O valor alvo deve ser positivo"),
  dataInicio: z.coerce.date({
    required_error: "A data de início é obrigatória",
  }),
  dataFim: z.coerce.date({
    required_error: "A data final é obrigatória",
  }),
});

export const MetaInserirSchema = MetaInserirBaseSchema.superRefine(
  (data, ctx) => {
    const hoje = DateUtils.getStartOfDay(new Date());
    const inicio = DateUtils.getStartOfDay(data.dataInicio);
    const fim = DateUtils.getStartOfDay(data.dataFim);

    if (inicio < hoje) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "A data de início deve ser hoje ou uma data futura.",
        path: ["dataFim"],
      });
    }

    if (fim < hoje) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "A data final deve ser hoje ou uma data futura.",
        path: ["dataFim"],
      });
    }

    if (fim < inicio) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "A data final não pode ser anterior à data de início.",
        path: ["dataFim"],
      });
    }

    if (fim <= inicio) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "A data final deve ser maior que a data de início.",
        path: ["dataFim"],
      });
    }
  }
);

export type MetaInserirDTO = z.infer<typeof MetaInserirSchema>;
