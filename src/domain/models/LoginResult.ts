export interface LoginResult {
  userId: string;
  token: string;
  refreshToken: string;
  expiresIn: number;
}
