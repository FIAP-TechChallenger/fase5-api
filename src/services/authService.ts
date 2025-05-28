import axios from "axios";
import { admin } from "../lib/firebase";

export const authService = {
  async loginWithEmailAndPassword(email: string, password: string) {
    const apiKey = process.env.FIREBASE_API_KEY;
    console.log(apiKey);

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

    const response = await axios.post(url, {
      email,
      password,
      returnSecureToken: true,
    });

    return response.data; // contém idToken, refreshToken, localId, etc.
  },

  async registerUser(email: string, password: string) {
    const userRecord = await admin.auth().createUser({ email, password });
    return userRecord;
  },

  async revokeUserTokens(uid: string) {
    await admin.auth().revokeRefreshTokens(uid);
  },
};
