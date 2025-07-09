import { LoginResult } from "@/domain/models/LoginResult";

export interface IAuthRepository {
  login(email: string, password: string): Promise<LoginResult>;
  refresh(refreshToken: string): Promise<LoginResult>;
  revokeTokens(uid: string): Promise<void>;
}
