import { z } from "zod";

export enum ProducaoStatusEnum {
  AGUARDANDO = "AGUARDANDO",
  EM_PRODUCAO = "EM_PRODUCAO",
  COLHIDA = "COLHIDA",
}

// zod
const ProducaoStatusEnumValues = [
  ProducaoStatusEnum.AGUARDANDO,
  ProducaoStatusEnum.EM_PRODUCAO,
  ProducaoStatusEnum.COLHIDA,
] as const;

export const ProducaoStatusEnumZod = z.enum(ProducaoStatusEnumValues);
