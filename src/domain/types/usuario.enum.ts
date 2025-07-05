import { z } from "zod";

export enum UsuarioSetorEnum {
  ADMIN = "ADMIN",
  PRODUCAO = "PRODUCAO",
  COMERCIAL = "COMERCIAL",
}

// zod
const UsuarioSetorEnumValues = [
  UsuarioSetorEnum.COMERCIAL,
  UsuarioSetorEnum.PRODUCAO,
] as const;

export const UsuarioSetorEnumZod = z.enum(UsuarioSetorEnumValues);
