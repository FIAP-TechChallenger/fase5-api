import { z } from "zod";


export const InsumoInserirSchema = z.object({
    nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    unidadeMedidaId: z.string().uuid("ID de medida inválido"), 
    
  });
  
  export type InsumoInserirDTO = z.infer<typeof InsumoInserirSchema>;