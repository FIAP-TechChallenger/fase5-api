import { IUsuarioRepository } from "@/domain/repositories/outros/IUsuarioRepository";
import { admin } from "@/infra/firebase/firebase-initialize";
import { Usuario } from "@/domain/entities/outros/Usuario";
import { UsuarioFirebase } from "@/infra/firebase/models/outros/UsuarioFirebase";
import { UsuarioConverter } from "@/infra/firebase/converters/outros/UsuarioConverter";
import { UsuarioSetorEnum } from "@/domain/types/usuario.enum";

export class FirebaseUsuarioRepository implements IUsuarioRepository {
  async buscarTodos(): Promise<Usuario[]> {
    const snapshot = await this._getCollection()
      .where("setor", "!=", UsuarioSetorEnum.ADMIN)
      .get();

    return snapshot.docs.map((doc) => {
      const data = doc.data() as UsuarioFirebase;
      return UsuarioConverter.fromFirestore(data, doc.id);
    });
  }

  async buscarPorId(id: string): Promise<Usuario | null> {
    const doc = await this._getCollection().doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data() as UsuarioFirebase;
    return UsuarioConverter.fromFirestore(data, doc.id);
  }

  async inserir(email: string, nome: string, setor: UsuarioSetorEnum) {
    const userRecord = await admin.auth().createUser({
      email: email,
      displayName: nome,
    });

    const data: UsuarioFirebase = UsuarioConverter.toFirestore(
      new Usuario({
        id: userRecord.uid,
        email,
        nome,
        setor,
        primeiroAcesso: true,
      })
    );
    await this._getCollection().doc(userRecord.uid).set(data);
  }

  async gerarEmailPrimeiroAcesso(email: string) {
    return admin.auth().generatePasswordResetLink(email);
  }

  private _getCollection() {
    return admin.firestore().collection("usuarios");
  }
}
