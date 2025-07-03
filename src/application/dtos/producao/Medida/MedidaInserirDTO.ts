import { z } from "zod";


export const MedidaInserirSchema = z.object({
    nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    sigla:z.string().min(1,"Sigal deve conter pelo menos 1 caracter"), 
    criadoEm: z.coerce.date()
  });
  
  export type MedidaInserirDTO = z.infer<typeof MedidaInserirSchema>;