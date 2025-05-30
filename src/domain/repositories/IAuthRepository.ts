import { LoginResponseDTO } from "@/application/dtos/LoginResponseDTO";

export interface IAuthRepository {
  login(email: string, password: string): Promise<LoginResponseDTO>;
  refresh(refreshToken: string): Promise<LoginResponseDTO>;
  register(email: string, password: string): Promise<void>;
  revokeTokens(uid: string): Promise<void>;
}
