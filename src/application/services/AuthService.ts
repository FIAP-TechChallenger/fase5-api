import { IAuthRepository } from "@/domain/repositories/IAuthRepository";

export class AuthService {
  constructor(private authRepo: IAuthRepository) {}

  login(email: string, password: string) {
    return this.authRepo.login(email, password);
  }

  refresh(refreshToken: string) {
    return this.authRepo.refresh(refreshToken);
  }

  async register(email: string, password: string): Promise<void> {
    await this.authRepo.register(email, password);
  }

  revokeTokens(uid: string) {
    return this.authRepo.revokeTokens(uid);
  }
}
