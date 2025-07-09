import { IEmailService } from "@/domain/interfaces/IEmailService";
import nodemailer from "nodemailer";

export class NodeMailerEmailService implements IEmailService {
  private _transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  async enviar(to: string, subject: string, conteudo: string): Promise<void> {
    await this._transporter.sendMail({
      from: `Equipe AgroFlow <${process.env.EMAIL_USER!}>`,
      to,
      subject,
      html: conteudo,
    });
  }
}
