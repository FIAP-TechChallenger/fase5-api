import { UsuarioSetorEnum } from "@/domain/types/usuario.enum";

export class Usuario {
  id: string;
  email: string;
  nome: string;
  setor: UsuarioSetorEnum;
  criadaEm: Date;
  primeiroAcesso?: boolean;

  constructor(obj: Usuario) {
    this.id = obj.id;
    this.email = obj.email;
    this.nome = obj.nome;
    this.setor = obj.setor;
    this.criadaEm = obj.criadaEm;
    this.primeiroAcesso = obj.primeiroAcesso;
  }
}
