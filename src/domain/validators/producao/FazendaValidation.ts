import { MetaTipoEnum } from "@/domain/types/meta.enum";
import { RefinementCtx } from "zod";

export class FazendaValidation {
  static validarCaracteres = (data: any, ctx: RefinementCtx) => {
    const regex = /^[a-zA-Z0-9\sáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ'",.!?()-]+$/;
    
    if (data.nome && !regex.test(data.nome)) {
      ctx.addIssue({
        path: ["nome"],
        message: "Nome contém caracteres inválidos",
        code: "custom"
      });
    }
  };
 
  };

