import {
  MetaStatusFiltroEnumZod,
  MetaTipoEnumZod,
} from "@/domain/types/meta.enum";
import { z } from "zod";

export const MetaBuscarTodosSchema = z.object({
  limite: z.number().optional().nullable(),
  ultimoId: z.string().optional().nullable(),
  tipo: MetaTipoEnumZod.optional().nullable(),
  status: MetaStatusFiltroEnumZod.optional().nullable(),
});

export type MetaBuscarTodosDTO = z.infer<typeof MetaBuscarTodosSchema>;
