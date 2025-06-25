import { z } from "zod";

import { FazendaValidation } from "@/domain/validators/producao/FazendaValidation";

export const FazendaInserirSchemaBase = z.object({
  nome: z.string()
  .min(1, "Nome deve ter pelo menos 1 caracter")
  .max(100, "Nome não pode exceder 100 caracteres")
});

export const FazendaInserirSchema = FazendaInserirSchemaBase.superRefine(
  FazendaValidation.validarTipoDependencias
);

export type FazendaInserirDTO = z.infer<typeof FazendaInserirSchema>;
