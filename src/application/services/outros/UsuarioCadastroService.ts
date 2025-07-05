import { UsuarioInserirDTO } from "@/application/dtos/outros/UsuarioInserirDTO";
import { IEmailService } from "@/domain/interfaces/IEmailService";
import { IUsuarioRepository } from "@/domain/repositories/outros/IUsuarioRepository";

export class UsuarioCadastroService {
  constructor(
    private emailService: IEmailService,
    private _usuarioRepo: IUsuarioRepository
  ) {}

  async inserir(usuario: UsuarioInserirDTO) {
    await this._usuarioRepo.inserir(usuario.email, usuario.nome, usuario.setor);

    const emailContent = await this._usuarioRepo.gerarEmailPrimeiroAcesso(
      usuario.email
    );
    await this.emailService.enviar(
      usuario.email,
      "AgroFlow - Primeiro acesso",
      emailContent
    );
  }
}
