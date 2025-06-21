import { z } from "zod";
import { MetaInserirSchemaBase } from "./MetaInserirDTO";
import { MetaValidation } from "@/domain/validators/comercial/meta.validation";

export const MetaAtualizarSchema = MetaInserirSchemaBase.extend({
  id: z.string().min(1, "ID é obrigatório"),
}).superRefine(MetaValidation.validarTipoDependencias);

export type MetaAtualizarDTO = z.infer<typeof MetaAtualizarSchema>;
