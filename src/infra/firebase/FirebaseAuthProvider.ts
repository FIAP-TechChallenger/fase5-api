import { Usuario } from "@/domain/entities/outros/Usuario";
import { getAuth } from "firebase-admin/auth";

export class FirebaseAuthProvider {
  async verifyToken(token: string): Promise<Usuario> {
    const decoded = await getAuth().verifyIdToken(token);

    return new Usuario(
      decoded.uid,
      decoded.email || "",
      decoded.name,
      decoded.setor
    );
  }
}
