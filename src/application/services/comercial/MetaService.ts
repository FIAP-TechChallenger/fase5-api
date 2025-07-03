import { IMetaRepository } from "@/domain/repositories/comercial/IMetaRepository";
import { MetaInserirDTO } from "@/application/dtos/comercial/MetaInserirDTO";
import { MetaAtualizarDTO } from "@/application/dtos/comercial/MetaAtualizarDTO";
import { Meta } from "@/domain/entities/comercial/Meta";
import { gerarUUID } from "@/shared/utils/gerarUUID";
import { MetaBuscarTodosDTO } from "@/application/dtos/comercial/MetaBuscarTodosDTO";
import { MetaBuscarTodosResponseDTO } from "@/application/dtos/comercial/MetaBuscarTodosResponseDTO";

export class MetaService {
  constructor(private readonly metaRepository: IMetaRepository) {}

  async buscarTodos(
    dto: MetaBuscarTodosDTO
  ): Promise<MetaBuscarTodosResponseDTO> {
    return this.metaRepository.buscarTodos(dto);
  }

  async inserir(usuarioId: string, dto: MetaInserirDTO): Promise<void> {
    const novaMeta: Meta = {
      id: gerarUUID(),
      tipo: dto.tipo,
      calculoPor: dto.calculoPor,
      titulo: dto.titulo,
      descricao: dto.descricao ?? "",
      valorAlvo: dto.valorAlvo,
      valorAtual: 0,
      dataInicio: dto.dataInicio,
      dataFim: dto.dataFim,
      usuarioId: usuarioId,
      fazendaId: dto.fazendaId ?? null,
      criadaEm: new Date(),
      atualizadaEm: new Date(),
    };
    await this.metaRepository.inserir(novaMeta);
  }

  async atualizar(dto: MetaAtualizarDTO): Promise<void> {
    const metaExistente = await this.metaRepository.buscarPorId(dto.id);
    if (!metaExistente) throw new Error("Meta não encontrada");

    const metaAtualizada: Meta = {
      ...metaExistente,
      ...dto,
      descricao: dto.descricao ?? "",
      atualizadaEm: new Date(),
    };

    await this.metaRepository.atualizar(metaAtualizada);
  }
}
