import { gerarUUID } from "@/shared/utils/gerarUUID";
import { Fazenda } from "@/domain/entities/producao/Fazenda";
import { IFazendaRepository } from "@/domain/repositories/producao/IFazendaRepository";
import { FazendaInserirDTO } from "@/application/dtos/producao/fazenda/FazendaInserirDTO";
import { FazendaBuscarTodosDTO } from "@/application/dtos/producao/fazenda/FazendaBuscarTodosDTO";
import { FazendaBuscarTodosResponseDTO } from "@/application/dtos/producao/fazenda/FazendaBuscarTodosResponseDTO";
import { FazendaAtualizarDTO } from "@/application/dtos/producao/fazenda/FazendaAtualizarDTO";

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
  async atualizar(dto: FazendaAtualizarDTO): Promise<void> {
    const fazendaExistente = await this.fazendaRepository.buscarPorId(dto.id);
    if (!fazendaExistente) throw new Error("fazenda não encontrada");

    const fazendaAtualizada: Fazenda = {
      ...fazendaExistente,
      ...dto,
     
    };

    await this.fazendaRepository.atualizar(fazendaAtualizada);
  }
}

