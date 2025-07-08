import { IAuthRepository } from "@/domain/repositories/outros/IAuthRepository";
import { IUsuarioRepository } from "@/domain/repositories/outros/IUsuarioRepository";

export class AuthService {
  constructor(
    private authRepo: IAuthRepository,
    private usuarioRepo: IUsuarioRepository
  ) {}

  async login(email: string, password: string) {
    const result = await this.authRepo.login(email, password);
    if (result) {
      const usuarioSalvo = await this.usuarioRepo.buscarPorId(result.userId);
      if (usuarioSalvo?.primeiroAcesso) {
        this.usuarioRepo.atualizar({ ...usuarioSalvo, primeiroAcesso: false });
      }
    }
    return result;
  }

  refresh(refreshToken: string) {
    return this.authRepo.refresh(refreshToken);
  }

  revokeTokens(uid: string) {
    return this.authRepo.revokeTokens(uid);
  }
}
