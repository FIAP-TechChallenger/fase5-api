import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export class LoginDTO {
  public email: string;
  public password: string;

  private constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  static validate(data: unknown): LoginDTO {
    const result = schema.safeParse(data);
    if (!result.success) throw new Error("Dados inválidos");

    const { email, password } = result.data;
    return new LoginDTO(email, password);
  }
}
