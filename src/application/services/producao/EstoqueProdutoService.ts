// import { gerarUUID } from "@/shared/utils/gerarUUID";
// import { IEstoqueProdutoRepository } from "@/domain/repositories/producao/IEstoqueProdutoRepository";
// import { EstoqueProduto } from "@/domain/entities/producao/EstoqueProduto";

// export class EstoqueProdutoService {
//   constructor(private readonly estoqueProdutoRepository: IEstoqueProdutoRepository) {}

//   async getAll(): Promise<EstoqueProduto[]> {
//     return this.estoqueProdutoRepository.getAll();
//   }

//   async inserir(dto: EstoqueProdutoInserirDTO): Promise<void> {
//     const novoEstoque: EstoqueProduto = {
//       id: gerarUUID(),
//       produto:dto.produto,
//       quantidade:dto.quantidade,
//       preco:dto.preco,
//       criadaEm: new Date(),
//     }
//       await this.estoqueProdutoRepository.insert(novoEstoque)
//   }
// }

