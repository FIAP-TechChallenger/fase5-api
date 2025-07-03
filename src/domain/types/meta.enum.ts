import { z } from "zod";

export enum MetaTipoEnum {
  VENDA = "VENDA",
  PRODUCAO = "PRODUCAO",
}

export enum MetaCalculoPorEnum {
  VALOR = "VALOR",
  QUANTIDADE = "QUANTIDADE",
}

// zod
const MetaTipoEnumValues = [MetaTipoEnum.VENDA, MetaTipoEnum.PRODUCAO] as const;

const MetaCalculoPorEnumValues = [
  MetaCalculoPorEnum.VALOR,
  MetaCalculoPorEnum.QUANTIDADE,
] as const;

export const MetaTipoEnumZod = z.enum(MetaTipoEnumValues);
export const MetaCalculoPorEnumZod = z.enum(MetaCalculoPorEnumValues);
