// import { gerarUUID } from "@/shared/utils/gerarUUID";
// import { Producao } from "@/domain/entities/producao/Producao";
// import { IProducaoRepository } from "@/domain/repositories/producao/IProducaoRepository";

// export class ProducaoService {
//   constructor(private readonly producaoRepository: IProducaoRepository) {}

//   async getAll(): Promise<Producao[]> {
//     return this.producaoRepository.getAll();
//   }

//   async inserir(dto: ProducaoInserirDTO): Promise<void> {
//     const novaProducao: Producao = {
//       id: gerarUUID(),
//       quantidade: dto.quantidade,
//       status: dto.status,
//       criadaEm: new Date(),
//       produto: dto.produto,
//       fazenda: dto.fazenda,
      
//     };
//     await this.producaoRepository.insert(novaProducao);
//   }
// }
// ;