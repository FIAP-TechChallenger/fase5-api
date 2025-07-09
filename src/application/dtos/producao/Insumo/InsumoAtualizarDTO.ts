import { z } from "zod";
import { InsumoInserirSchema } from "./InsumoInserirDTO";

export const InsumoAtualizarSchema = InsumoInserirSchema.and(
    z.object({
      id: z.string().min(1, "ID é obrigatório"),
    })
  );
  
  export type InsumoAtualizarDTO = z.infer<typeof InsumoAtualizarSchema>;