import { IAuthRepository } from "@/domain/repositories/outros/IAuthRepository";

export class AuthService {
  constructor(private authRepo: IAuthRepository) {}

  login(email: string, password: string) {
    return this.authRepo.login(email, password);
  }

  refresh(refreshToken: string) {
    return this.authRepo.refresh(refreshToken);
  }

  revokeTokens(uid: string) {
    return this.authRepo.revokeTokens(uid);
  }
}
