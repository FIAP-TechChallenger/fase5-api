import axios from "axios";
import { admin } from "@/infra/firebase/firebase-initialize";
import { IAuthRepository } from "@/domain/repositories/outros/IAuthRepository";
import { FirebaseSignInResponse } from "@/infra/firebase/models/outros/FirebaseSignInResponse";
import { LoginResponseDTO } from "@/application/dtos/outros/LoginResponseDTO";
import { FirebaseRefreshTokenResponse } from "@/infra/firebase/models/outros/FirebaseRefreshTokenResponse";

export class FirebaseAuthRepository implements IAuthRepository {
  private _apiKey = process.env.FIREBASE_API_KEY;

  async login(email: string, password: string): Promise<LoginResponseDTO> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this._apiKey}`;

    try {
      const { data } = await axios.post<FirebaseSignInResponse>(url, {
        email,
        password,
        returnSecureToken: true,
      });

      return {
        userId: data.localId,
        token: data.idToken,
        refreshToken: data.refreshToken,
        expiresIn: Number.parseInt(data.expiresIn),
      };
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Erro ao fazer login: ${
            error.response?.data?.error?.message || error.message
          }`
        );
      }
      throw error;
    }
  }

  async refresh(refreshToken: string): Promise<LoginResponseDTO> {
    const url = `https://securetoken.googleapis.com/v1/token?key=${this._apiKey}`;

    const body = new URLSearchParams();
    body.append("grant_type", "refresh_token");
    body.append("refresh_token", refreshToken);

    try {
      const { data } = await axios.post<FirebaseRefreshTokenResponse>(
        url,
        body.toString(),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      return {
        userId: data.user_id,
        token: data.id_token,
        refreshToken: data.refresh_token,
        expiresIn: Number.parseInt(data.expires_in),
      };
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Erro ao atualizar token: ${
            error.response?.data?.error?.message || error.message
          }`
        );
      }
      throw error;
    }
  }

  async revokeTokens(uid: string) {
    await admin.auth().revokeRefreshTokens(uid);
  }
}
