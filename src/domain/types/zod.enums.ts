import { z } from "zod";
import { MetaStatusEnum, MetaTipoEnum, MetaCalculoPorEnum } from "./meta.enum";

const MetaTipoEnumValues = [MetaTipoEnum.VENDA, MetaTipoEnum.PRODUCAO] as const;

const MetaStatusEnumValues = [
  MetaStatusEnum.ATIVA,
  MetaStatusEnum.CANCELADA,
  MetaStatusEnum.CONCLUIDA,
  MetaStatusEnum.EXPIRADA,
  MetaStatusEnum.INICIALIZADA,
] as const;

const MetaCalculoPorEnumValues = [
  MetaCalculoPorEnum.VALOR,
  MetaCalculoPorEnum.QUANTIDADE,
] as const;

export const MetaTipoEnumZod = z.enum(MetaTipoEnumValues);
export const MetaStatusEnumZod = z.enum(MetaStatusEnumValues);
export const MetaCalculoPorEnumZod = z.enum(MetaCalculoPorEnumValues);
