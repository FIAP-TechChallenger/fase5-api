export class DashboardProdutoLucro {
  produtoId: string;
  lucro: number;
  qtdVendida: number;
  dataVenda: Date;

  constructor(obj: DashboardProdutoLucro) {
    this.produtoId = obj.produtoId;
    this.lucro = obj.lucro;
    this.qtdVendida = obj.qtdVendida;
    this.dataVenda = obj.dataVenda;
  }
}
