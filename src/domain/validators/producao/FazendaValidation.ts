import { MetaTipoEnum } from "@/domain/types/meta.enum";
import { RefinementCtx } from "zod";

export class FazendaValidation {
  static validarTipoDependencias = (data: any, ctx: RefinementCtx) => {
    if (data.tipo === MetaTipoEnum.VENDA && !data.vendaId) {
      ctx.addIssue({
        path: ["vendaId"],
        message: `vendaId é obrigatório quando tipo é "${MetaTipoEnum.VENDA}".`,
        code: "custom",
      });
    }

    if (data.tipo === MetaTipoEnum.PRODUCAO && !data.producaoId) {
      ctx.addIssue({
        path: ["producaoId"],
        message: `producaoId é obrigatório quando tipo é "${MetaTipoEnum.PRODUCAO}".`,
        code: "custom",
      });
    }
  };
}
