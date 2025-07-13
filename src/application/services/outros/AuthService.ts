import { LoginResponseDTO } from "@/application/dtos/outros/usuario/LoginResponseDTO";
import { LoginResult } from "@/domain/models/LoginResult";
import { IAuthRepository } from "@/domain/repositories/outros/IAuthRepository";
import { IUsuarioRepository } from "@/domain/repositories/outros/IUsuarioRepository";

export class AuthService {
  constructor(
    private authRepo: IAuthRepository,
    private usuarioRepo: IUsuarioRepository
  ) {}

  async login(email: string, password: string): Promise<LoginResponseDTO> {
    const result = await this.authRepo.login(email, password);
    return this._getLoginResponse(result);
  }

  async refresh(refreshToken: string): Promise<LoginResponseDTO> {
    const result = await this.authRepo.refresh(refreshToken);
    return this._getLoginResponse(result);
  }

  revokeTokens(uid: string) {
    return this.authRepo.revokeTokens(uid);
  }

  private async _getLoginResponse(
    authData: LoginResult
  ): Promise<LoginResponseDTO> {
    const usuarioSalvo = await this.usuarioRepo.buscarPorId(authData.userId);

    if (usuarioSalvo?.primeiroAcesso) {
      this.usuarioRepo.atualizar({ ...usuarioSalvo, primeiroAcesso: false });
    }

    return {
      userId: authData.userId,
      nome: usuarioSalvo!.nome,
      setor: usuarioSalvo!.setor,
      token: authData.token,
      refreshToken: authData.refreshToken,
      expiresIn: authData.expiresIn,
    };
  }
}
