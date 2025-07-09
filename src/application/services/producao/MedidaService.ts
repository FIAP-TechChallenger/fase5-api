import { gerarUUID } from "@/shared/utils/gerarUUID";
import { Fazenda } from "@/domain/entities/producao/Fazenda";
import { IMedidaRepository } from "@/domain/repositories/producao/IMedidaRepository";
import { Medida } from "@/domain/entities/producao/Medida";
import { MedidaInserirDTO } from "@/application/dtos/producao/Medida/MedidaInserirDTO";
import { MedidaBuscarTodosDTO } from "@/application/dtos/producao/Medida/MedidaBuscarTodosDTO";
import { MedidaBuscarTodosResponseDTO } from "@/application/dtos/producao/Medida/MedidaBuscarTodosResponseDTO";
import { MetaAtualizarDTO } from "@/application/dtos/comercial/MetaAtualizarDTO";


export class MedidaService {
  constructor(private readonly medidaRepository: IMedidaRepository) {}

  async buscarTodos(dto:MedidaBuscarTodosDTO): Promise<MedidaBuscarTodosResponseDTO> {
    return this.medidaRepository.buscarTodos(dto);
  }

  async inserir(dto: MedidaInserirDTO): Promise<void> {
    const novaMedida: Medida = {
      id: gerarUUID(),
      nome: dto.nome,
      sigla: dto.sigla,
      criadaEm: new Date(),
    };
    await this.medidaRepository.inserir(novaMedida);
  }
  async buscarSigla(medidaId: string): Promise<string> {
    return this.medidaRepository.buscarSigla(medidaId);
  }
  async atualizar(dto: MetaAtualizarDTO): Promise<void> {
    const medidaExistente = await this.medidaRepository.buscarPorId(dto.id);
    if (!medidaExistente) throw new Error("Meta não encontrada");

    const medidaAtualizada: Medida = {
      ...medidaExistente,
      ...dto,
     
    };

    await this.medidaRepository.atualizar(medidaAtualizada);
  }
}
