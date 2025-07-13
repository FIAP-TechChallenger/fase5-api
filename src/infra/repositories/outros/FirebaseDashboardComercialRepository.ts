import { admin } from "@/infra/firebase/firebase-initialize";
import { IDashboardComercialRepository } from "@/domain/repositories/outros/IDashboardComercialRepository";
import { DashboardProdutoLucro } from "@/domain/entities/outros/DashboardProdutoLucro";
import { DashboardProdutoLucroConverter } from "@/infra/firebase/converters/outros/DashboardProdutoLucroConverter";
import { gerarUUID } from "@/shared/utils/gerarUUID";
import { DashboardProdutoLucroFirebase } from "@/infra/firebase/models/outros/dashboard/DashboardComercialProdutoVenda";

export class FirebaseDashboardComercialRepository
  implements IDashboardComercialRepository
{
  async getProdutosLucro(): Promise<DashboardProdutoLucro[]> {
    const snapshot = await this._getProdutoLucroCollection().get();
    return snapshot.docs.map((doc) => {
      const data = doc.data() as DashboardProdutoLucroFirebase;
      return DashboardProdutoLucroConverter.fromFirestore(data);
    });
  }

  async addProdutoLucro(dados: DashboardProdutoLucro): Promise<void> {
    const docData = DashboardProdutoLucroConverter.toFirestore(dados);
    await this._getProdutoLucroCollection().doc(gerarUUID()).set(docData);
  }

  private _getProdutoLucroCollection() {
    return this._getCollection().doc("produtoLucro").collection("registros");
  }

  private _getCollection() {
    return admin.firestore().collection("dashboard");
  }
}
