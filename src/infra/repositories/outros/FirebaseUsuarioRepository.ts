import { IUsuarioRepository } from "@/domain/repositories/outros/IUsuarioRepository";
import { admin } from "@/infra/firebase/firebase-initialize";
import { Usuario } from "@/domain/entities/outros/Usuario";
import { UsuarioFirebase } from "@/infra/firebase/models/outros/UsuarioFirebase";
import { UsuarioConverter } from "@/infra/firebase/converters/outros/UsuarioConverter";
import { UsuarioSetorEnum } from "@/domain/types/usuario.enum";
import { UsuarioBuscarTodosDTO } from "@/application/dtos/outros/UsuarioBuscarTodosDTO";
import { UsuarioBuscarTodosResponseDTO } from "@/application/dtos/outros/UsuarioBuscarTodosResponseDTO";

export class FirebaseUsuarioRepository implements IUsuarioRepository {
  async buscarTodos(
    dto: UsuarioBuscarTodosDTO
  ): Promise<UsuarioBuscarTodosResponseDTO> {
    const limite = dto?.limite ?? 10;

    let query = this._getCollection()
      .orderBy("criadaEm", "desc")
      .orderBy("__name__")
      .limit(limite);

    if (dto?.ultimoId) {
      const lastSnap = await this._getCollection().doc(dto.ultimoId).get();
      if (lastSnap.exists) {
        query = query.startAfter(lastSnap);
      }
    }

    const snapshot = await query.get();
    const dados = snapshot.docs
      .map((doc) => {
        const data = doc.data() as UsuarioFirebase;
        return UsuarioConverter.fromFirestore(data, doc.id);
      })
      .filter((u) => u.setor !== UsuarioSetorEnum.ADMIN);

    const lastVisible = dados[dados.length - 1];
    return {
      dados,
      ultimoId: lastVisible?.id ?? null,
      temMais: dados.length === limite,
    };
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
        criadaEm: new Date(),
      })
    );
    await this._getCollection().doc(userRecord.uid).set(data);
  }

  async atualizar(usuario: Usuario): Promise<void> {
    const data: UsuarioFirebase = UsuarioConverter.toFirestore(usuario);
    await this._getCollection()
      .doc(usuario.id)
      .update({ ...data });
  }

  async gerarLinkRedefinirSenha(email: string) {
    return admin.auth().generatePasswordResetLink(email);
  }

  private _getCollection() {
    return admin.firestore().collection("usuarios");
  }
}
