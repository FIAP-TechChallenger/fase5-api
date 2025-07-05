import { IEmailService } from "@/domain/interfaces/IEmailService";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export class ResendEmailService implements IEmailService {
  async enviar(to: string, subject: string, conteudo: string): Promise<void> {
    await resend.emails.send({
      from: process.env.FIREBASE_EMAIL_DOMAIN!,
      to,
      subject,
      html: conteudo,
    });
  }
}
