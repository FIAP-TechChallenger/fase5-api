import { DashboardProdutoLucro } from "@/domain/entities/outros/DashboardProdutoLucro";

export interface IDashboardComercialRepository {
  getProdutosLucro(): Promise<DashboardProdutoLucro[]>;
  addProdutoLucro(dados: DashboardProdutoLucro): Promise<void>;
}
