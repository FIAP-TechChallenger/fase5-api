import axios from "axios";
import { admin } from "../firebase/firebase-initialize";
import { IAuthRepository } from "src/domain/repositories/IAuthRepository";

export class FirebaseAuthRepository implements IAuthRepository {
  async login(email: string, password: string) {
    const apiKey = process.env.FIREBASE_API_KEY;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

    const response = await axios.post(url, {
      email,
      password,
      returnSecureToken: true,
    });

    return response.data;
  }

  async register(email: string, password: string) {
    const userRecord = await admin.auth().createUser({ email, password });
    return userRecord;
  }

  async revokeTokens(uid: string) {
    await admin.auth().revokeRefreshTokens(uid);
  }
}
