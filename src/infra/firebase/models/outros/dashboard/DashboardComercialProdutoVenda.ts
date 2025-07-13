import { Timestamp } from "firebase-admin/firestore";

export interface DashboardProdutoLucroFirebase {
  produtoId: string;
  lucro: number;
  qtdVendida: number;
  dataVenda: Timestamp;
}
