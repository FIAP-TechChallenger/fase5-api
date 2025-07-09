import { z } from "zod";
import { MedidaInserirSchema } from "./MedidaInserirDTO";

export const MedidaAtualizarSchema = MedidaInserirSchema.and(
    z.object({
      id: z.string().min(1, "ID é obrigatório"),
    })
  );
  
  export type MedidaAtualizarDTO = z.infer<typeof MedidaAtualizarSchema>;