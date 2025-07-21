import { z } from "zod";

export enum MetaTipoEnum {
  VENDA = "VENDA",
  PRODUCAO = "PRODUCAO",
}

export enum MetaCalculoPorEnum {
  VALOR = "VALOR",
  QUANTIDADE = "QUANTIDADE",
}

export enum MetaStatusEnum {
  ALCANCADA = "ALCANCADA",
  NAO_ALCANCADA = "NAO_ALCANCADA",
  EM_ANDAMENTO = "EM_ANDAMENTO",
}

export enum MetaStatusFiltroEnum {
  TODOS = "TODOS",
  ALCANCADA = "ALCANCADA",
  NAO_ALCANCADA = "NAO_ALCANCADA",
  EM_ANDAMENTO = "EM_ANDAMENTO",
}

// zod
const MetaTipoEnumValues = [MetaTipoEnum.VENDA, MetaTipoEnum.PRODUCAO] as const;

const MetaCalculoPorEnumValues = [
  MetaCalculoPorEnum.VALOR,
  MetaCalculoPorEnum.QUANTIDADE,
] as const;

const MetaStatusEnumValues = [
  MetaStatusFiltroEnum.TODOS,
  MetaStatusFiltroEnum.ALCANCADA,
  MetaStatusFiltroEnum.NAO_ALCANCADA,
  MetaStatusFiltroEnum.EM_ANDAMENTO,
] as const;

const MetaStatusFiltroEnumValues = [
  MetaStatusFiltroEnum.TODOS,
  MetaStatusFiltroEnum.ALCANCADA,
  MetaStatusFiltroEnum.NAO_ALCANCADA,
  MetaStatusFiltroEnum.EM_ANDAMENTO,
] as const;

export const MetaTipoEnumZod = z.enum(MetaTipoEnumValues);
export const MetaCalculoPorEnumZod = z.enum(MetaCalculoPorEnumValues);
export const MetaStatusEnumZod = z.enum(MetaStatusEnumValues);
export const MetaStatusFiltroEnumZod = z.enum(MetaStatusFiltroEnumValues);
