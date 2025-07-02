import { UsuarioSetorEnum } from "@/domain/types/usuario.enum";

export class Usuario {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name?: string,
    public readonly setor?: UsuarioSetorEnum
  ) {}
}
