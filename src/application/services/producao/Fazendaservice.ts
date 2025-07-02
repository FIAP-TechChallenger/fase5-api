import { gerarUUID } from "@/shared/utils/gerarUUID";
import { Fazenda } from "@/domain/entities/producao/Fazenda";
import { IFazendaRepository } from "@/domain/repositories/producao/IFazendaRepository";
import { FazendaInserirDTO } from "@/application/dtos/producao/fazenda/FazendaInserirDTO";
import { MetaBuscarTodosDTO } from "@/application/dtos/comercial/MetaBuscarTodosDTO";
import { MetaBuscarTodosResponseDTO } from "@/application/dtos/comercial/MetaBuscarTodosResponseDTO";
import { FazendaBuscarTodosDTO } from "@/application/dtos/producao/fazenda/FazendaBuscarTodosDTO";
import { FazendaBuscarTodosResponseDTO } from "@/application/dtos/producao/fazenda/FazendaBuscarTodosResponseDTO";

export class FazendaService {
  constructor(private readonly fazendaRepository: IFazendaRepository) {}

  async buscarTodos(dto:FazendaBuscarTodosDTO): Promise<FazendaBuscarTodosResponseDTO> {
    return this.fazendaRepository.buscarTodos(dto);
  }

  async inserir(dto: FazendaInserirDTO): Promise<void> {
    const novaFazenda: Fazenda = {
      id: gerarUUID(),
      nome:dto.nome,
      criadaEm: new Date(),
      atualizadaEm: new Date(),
    };
    await this.fazendaRepository.insert(novaFazenda);
  }
}
// constructor(private readonly metaRepository: IMetaRepository) {}

// async buscarTodos(
//   dto: MetaBuscarTodosDTO
// ): Promise<MetaBuscarTodosResponseDTO> {
//   return this.metaRepository.buscarTodos(dto);
// }
