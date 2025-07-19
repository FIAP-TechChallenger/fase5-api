import { VendaBuscarTodosDTO } from "@/application/dtos/comercial/Venda/VendaBuscarTodosDTO";
import { VendaBuscarTodosResponseDTO } from "@/application/dtos/comercial/Venda/VendaBUscarTodosResponseDTO";
import { Venda } from "@/domain/entities/comercial/Venda";
import { IVendaRepository } from "@/domain/repositories/comercial/IvendaRepository";
import { VendaConverter } from "@/infra/firebase/converters/comercial/VendaConverter";
import { admin } from "@/infra/firebase/firebase-initialize";
import { VendaFirebase } from "@/infra/firebase/models/comercial/VendaFirebase";

export class FirebaseVendaRepository implements IVendaRepository {
  
  
    async buscarPorId(id: string): Promise<Venda | null> {
      const doc = await this._getCollection().doc(id).get();
      if (!doc.exists) return null;
      const data = doc.data() as VendaFirebase;
      return VendaConverter.fromFirestore(data, doc.id);
    }
  
    async buscarTodos(dto: VendaBuscarTodosDTO): Promise<VendaBuscarTodosResponseDTO> {
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
      const dados = snapshot.docs.map((doc) => {
        const data = doc.data() as VendaFirebase;
        return VendaConverter.fromFirestore(data, doc.id);
      });
  
      const lastVisible = dados[dados.length - 1];
      return {
        dados,
        ultimoId: lastVisible?.id ?? null,
        temMais: dados.length === limite,
      };
    }
  
    async inserir(venda: Venda): Promise<void> {
      const data: VendaFirebase = VendaConverter.toFirestore(venda);
      await this._getCollection().doc(venda.id).set(data);
    }
  
    async atualizar(venda: Venda): Promise<void> {
      const data: VendaFirebase = VendaConverter.toFirestore(venda);
      await this._getCollection().doc(venda.id).update({ ...data });
    }
    private _getCollection() {
        return admin.firestore().collection("venda");
      }
  }