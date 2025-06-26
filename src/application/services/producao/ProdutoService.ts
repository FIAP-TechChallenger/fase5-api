// import { gerarUUID } from "@/shared/utils/gerarUUID";
// import { IProdutoRepository } from "@/domain/repositories/producao/IProdutoRepository";
// import { Produto } from "@/domain/entities/producao/Produto";

// export class ProdutoService {
//   constructor(private readonly produtoRepository: IProdutoRepository) {}

//   async getAll(): Promise<Produto[]> {
//     return this.produtoRepository.getAll();
//   }

//   async inserir(dto: ProdutoInserirDTO): Promise<void> {
//     const novaProduto: Produto = {
//       id: gerarUUID(),
//       nome:dto.nome,
//       unidadeMedida:dto.unidadeMedida,
//       criadaEm: new Date(),
     
//     };
//     await this.produtoRepository.insert(novaProduto);
//   }
// }
