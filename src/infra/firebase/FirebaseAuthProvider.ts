import { getAuth, DecodedIdToken } from "firebase-admin/auth";

export class FirebaseAuthProvider {
  async verifyToken(token: string): Promise<DecodedIdToken> {
    return await getAuth().verifyIdToken(token);
  }
}
