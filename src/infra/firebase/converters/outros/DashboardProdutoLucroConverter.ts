import { getFirebaseTimeStamp } from "@/shared/utils/getFirebaseTimeStamp";
import { DashboardProdutoLucroFirebase } from "../../models/outros/dashboard/DashboardComercialProdutoVenda";
import { DashboardProdutoLucro } from "@/domain/entities/outros/DashboardProdutoLucro";

export class DashboardProdutoLucroConverter {
  static toFirestore(
    dados: DashboardProdutoLucro
  ): DashboardProdutoLucroFirebase {
    return {
      produtoId: dados.produtoId,
      qtdVendida: dados.qtdVendida,
      lucro: dados.lucro,
      dataVenda: getFirebaseTimeStamp(dados.dataVenda),
    };
  }

  static fromFirestore(
    dados: DashboardProdutoLucroFirebase
  ): DashboardProdutoLucro {
    return new DashboardProdutoLucro({
      produtoId: dados.produtoId,
      qtdVendida: dados.qtdVendida,
      lucro: dados.lucro,
      dataVenda: dados.dataVenda.toDate(),
    });
  }
}
