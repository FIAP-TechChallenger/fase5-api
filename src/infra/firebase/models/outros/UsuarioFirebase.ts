import { UsuarioSetorEnum } from "@/domain/types/usuario.enum";
import { Timestamp } from "firebase-admin/firestore";

export interface UsuarioFirebase {
  email: string;
  nome: string;
  setor: UsuarioSetorEnum;
  criadaEm: Timestamp;
  primeiroAcesso?: boolean;
}
