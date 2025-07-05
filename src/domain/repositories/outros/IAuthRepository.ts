import { LoginResponseDTO } from "@/application/dtos/outros/LoginResponseDTO";

export interface IAuthRepository {
  login(email: string, password: string): Promise<LoginResponseDTO>;
  refresh(refreshToken: string): Promise<LoginResponseDTO>;
  revokeTokens(uid: string): Promise<void>;
}
