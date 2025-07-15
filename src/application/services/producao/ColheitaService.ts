import { Colheita } from "@/domain/entities/producao/Colheita";
import { IColheitaRepository } from "@/domain/repositories/producao/IColheitaRepository";
import { ColheitaInserirDTO } from "@/application/dtos/producao/Colheita/ColheitaInserirDTO";
import { ColheitaBuscarTodosDTO } from "@/application/dtos/producao/Colheita/ColheitaBuscarTodosDTO";
import { ColheitaBuscarTodosResponseDTO } from "@/application/dtos/producao/Colheita/ColheitaBuscarTodosResponseDTO";
import { gerarUUID } from "@/shared/utils/gerarUUID";

export class ColheitaService {
    constructor(
        private readonly colheitaRepository: IColheitaRepository,
      ) {}

    async buscarTodos(dto:ColheitaBuscarTodosDTO): Promise<ColheitaBuscarTodosResponseDTO> {
        return this.colheitaRepository.buscarTodos(dto) ;
      }

  async inserir(dto: ColheitaInserirDTO): Promise<void> {
    const colheita = new Colheita({
      id: gerarUUID(),
      quantidadeColhida: dto.quantidadeColhida,
      perdas: dto.perdas,
      custoProducao: dto.custoProducao,
      preco: dto.preco,
      producaoId: dto.producaoId,
      dataInicio: new Date(dto.dataInicio),
      dataFim: new Date(dto.dataFim),
      criadaEm: new Date(),
    });
    await this.colheitaRepository.insert(colheita);
  }

//   async atualizar(dto: ColheitaAtualizarDTO): Promise<void> {
//     const existente = await this.colheitaRepository.buscarPorId(dto.id);
//     if (!existente) throw new Error("colheita não encontrada");

//     const colheita: Colheita = new Colheita({
//       id: dto.id,
//       quantidadeColhida: dto.quantidadeColhida,
//       perdas: dto.perdas,
//       custoProducao: dto.custoProducao,
//       preco: dto.preco,
//       producaoId: dto.producaoId,
//       dataInicio: new Date(dto.dataInicio),
//       dataFim: new Date(dto.dataFim),
//     });
//     await this.colheitaRepository.atualizar(colheita);
    
//   }


 
}