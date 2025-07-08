import { IEmailService } from "@/domain/interfaces/IEmailService";
import { Resend } from "resend";

export class ResendEmailService implements IEmailService {
  private _resend = new Resend(process.env.RESEND_API_KEY!);

  async enviar(to: string, subject: string, conteudo: string): Promise<void> {
    await this._resend.emails.send({
      from: process.env.FIREBASE_EMAIL_DOMAIN!,
      to,
      subject,
      html: conteudo,
    });
  }
}
