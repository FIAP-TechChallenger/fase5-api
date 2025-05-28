export interface IAuthRepository {
  login(email: string, password: string): Promise<any>;
  register(email: string, password: string): Promise<any>;
  revokeTokens(uid: string): Promise<void>;
}
