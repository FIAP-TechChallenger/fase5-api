import { z } from "zod";

export enum VendaStatusEnum {
    AGUARDANDO = "AGUARDANDO",
    VENDIDA = "VENDIDA"
  }
  
  // zod
const VendaStatusEnumValues = [
  VendaStatusEnum.AGUARDANDO,
  VendaStatusEnum.VENDIDA
] as const;

export const VendaStatusEnumZod = z.enum(VendaStatusEnumValues);
