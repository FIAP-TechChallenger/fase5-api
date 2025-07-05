import { UsuarioSetorEnum } from "@/domain/types/usuario.enum";

export interface UsuarioFirebase {
  email: string;
  nome: string;
  setor: UsuarioSetorEnum;
  primeiroAcesso?: boolean;
}
