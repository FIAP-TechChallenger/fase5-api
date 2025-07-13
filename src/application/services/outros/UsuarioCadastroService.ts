import { UsuarioInserirDTO } from "@/application/dtos/outros/usuario/UsuarioInserirDTO";
import { IEmailService } from "@/domain/interfaces/IEmailService";
import { IUsuarioRepository } from "@/domain/repositories/outros/IUsuarioRepository";

export class UsuarioCadastroService {
  private _primeiroAcessoEmailAssunto = "Acesso criado - Defina sua senha";
  private _recuperarSenhaEmailAssunto = "Recuperação de senha";

  constructor(
    private emailService: IEmailService,
    private _usuarioRepo: IUsuarioRepository
  ) {}

  async inserir(usuario: UsuarioInserirDTO) {
    await this._usuarioRepo.inserir(usuario.email, usuario.nome, usuario.setor);

    const link = await this._usuarioRepo.gerarLinkRedefinirSenha(usuario.email);

    await this.emailService.enviar(
      usuario.email,
      this._primeiroAcessoEmailAssunto,
      this._getEmailPrimeiroAcesso(usuario.nome, link)
    );
  }

  async recuperarSenha(usuarioId: string) {
    const usuario = await this._usuarioRepo.buscarPorId(usuarioId);
    if (!usuario) throw new Error("Usuário não encontrado.");

    const link = await this._usuarioRepo.gerarLinkRedefinirSenha(usuario.email);
    const assunto = usuario.primeiroAcesso
      ? this._primeiroAcessoEmailAssunto
      : this._recuperarSenhaEmailAssunto;

    await this.emailService.enviar(
      usuario.email,
      assunto,
      this._getEmailRecuperarSenha(usuario.nome, link)
    );
  }

  private _getEmailPrimeiroAcesso(nome: string, link: string) {
    return `
      <h2 style="color: #154e39; font-family: Arial, sans-serif;">
        Olá ${nome},
      </h2>

      <p style="font-family: Arial, sans-serif; color: #333;">
        Seu acesso à <strong>AgroFlow</strong> foi criado por um administrador.
      </p>

      <p style="font-family: Arial, sans-serif; color: #333;">
        Para começar, defina sua senha clicando no botão abaixo:
      </p>

      <p style="text-align: center; margin: 24px 0;">
        <a href="${link}" style="
          background-color: #154e39;
          color: #ffffff;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
          font-family: Arial, sans-serif;
          display: inline-block;
        ">
          Definir minha senha
        </a>
      </p>

      <p style="font-family: Arial, sans-serif; color: #666; font-size: 13px;">
        Se você não reconhece este acesso, basta ignorar esta mensagem.
      </p>

      <p style="font-family: Arial, sans-serif; color: #333; margin-top: 32px;">
        Atenciosamente,<br />
        Equipe AgroFlow
      </p>
    `;
  }

  private _getEmailRecuperarSenha(nome: string, link: string) {
    return `
      <h2 style="color: #154e39; font-family: Arial, sans-serif;">
        Olá ${nome},
      </h2>

      <p style="font-family: Arial, sans-serif; color: #333;">
        Recebemos uma solicitação para redefinir sua senha no <strong>AgroFlow</strong>.
      </p>

      <p style="font-family: Arial, sans-serif; color: #333;">
        Para criar uma nova senha, clique no botão abaixo:
      </p>

      <p style="text-align: center; margin: 24px 0;">
        <a href="${link}" style="
          background-color: #154e39;
          color: #fff;
          padding: 12px 20px;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          font-family: Arial, sans-serif;
        ">
          Redefinir Senha
        </a>
      </p>

      <p style="font-family: Arial, sans-serif; color: #666;">
        Se você não solicitou a redefinição, pode ignorar este e-mail.
      </p>

      <p style="font-family: Arial, sans-serif; color: #333; margin-top: 32px;">
        Atenciosamente,<br />
        Equipe AgroFlow
      </p>
    `;
  }
}
