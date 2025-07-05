export interface IEmailService {
  enviar(to: string, subject: string, conteudo: string): Promise<void>;
}
