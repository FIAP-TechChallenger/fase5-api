import { DashboardLucroPorProdutoDTO } from "@/application/dtos/outros/dashboard/DashboardLucroPorProdutoDTO";
import {
  DashboardComercialAtualizarParams,
  IDashboardComercialService,
} from "@/domain/interfaces/IDashboardComercialService";
import { IDashboardComercialRepository } from "@/domain/repositories/outros/IDashboardComercialRepository";
import { IProdutoRepository } from "@/domain/repositories/producao/IProdutoRepository";

export class DashboardComercialService implements IDashboardComercialService {
  constructor(
    private readonly _dashRepo: IDashboardComercialRepository,
    private produtoRepo: IProdutoRepository,
   
  ) {}

  async getLucroPorProduto(): Promise<DashboardLucroPorProdutoDTO[]> {
    const registros = await this._dashRepo.getProdutosLucro();
    const lucroPorProduto = new Map<string, number>();

    for (const r of registros) {
      lucroPorProduto.set(
        r.produtoId,
        (lucroPorProduto.get(r.produtoId) || 0) + r.lucro
      );
    }

    const produtoIds = Array.from(lucroPorProduto.keys());
    const produtoDocs = await Promise.all(
      produtoIds.map((id) => this.produtoRepo.buscarPorId(id))
    );

    const idParaNomeMap = new Map<string, string>();
    produtoDocs.forEach((produto) => {
      if (!!produto) {
        idParaNomeMap.set(produto.id, produto.nome || "Sem nome");
      }
    });

    return produtoIds.map(
      (produtoId) =>
        ({
          produto: idParaNomeMap.get(produtoId) ?? "Produto desconhecido",
          lucro: lucroPorProduto.get(produtoId) ?? 0,
          qtdVendida: 0,
        } as DashboardLucroPorProdutoDTO)
    );
  }

  async atualizar(params: DashboardComercialAtualizarParams): Promise<void> {
    await Promise.all([
      this._dashRepo.addProdutoLucro({
        produtoId: params.produtoId,
        lucro: params.lucro,
        qtdVendida: params.qtdVendida,
        dataVenda: params.dataVenda,
      }),
    ]);
  }
}
