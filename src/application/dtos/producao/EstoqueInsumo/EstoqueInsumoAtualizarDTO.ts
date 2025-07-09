import { z } from "zod";
import { EstoqueInsumoInserirSchema } from "./EstoqueInsumoInserirDTO";

export const EstoqueInsumoAtualizarSchema = EstoqueInsumoInserirSchema.and(
    z.object({
      id: z.string().min(1, "ID é obrigatório"),
    })
  );
  
  export type EstoqueInsumoAtualizarDTO = z.infer<typeof EstoqueInsumoAtualizarSchema>;