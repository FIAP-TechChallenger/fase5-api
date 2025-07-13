export interface DashboardComercialAtualizarParams {
  produtoId: string;
  lucro: number;
  qtdVendida: number;
  dataVenda: Date;
}

export interface IDashboardComercialService {
  atualizar(dados: DashboardComercialAtualizarParams): Promise<void>;
}
