import { gerarUUID } from "@/shared/utils/gerarUUID";
import { Producao } from "@/domain/entities/producao/Producao";
import { IProducaoRepository } from "@/domain/repositories/producao/IProducaoRepository";
import { ProducaoInserirDTO } from "@/application/dtos/producao/Producao/ProducaoInserirDTO";
import { ProducaoStatus } from "@/domain/types/producaoStatus.enum";
import { ProducaoBuscarTodosDTO } from "@/application/dtos/producao/Producao/ProducaoBuscarTodosDTO";
import { ProducaoBuscarTodosResponseDTO, ProducaoItemDTO } from "@/application/dtos/producao/Producao/ProducaoBuscarTodosResponse";
import { IProdutoRepository } from "@/domain/repositories/producao/IProdutoRepository";
import { IFazendaRepository } from "@/domain/repositories/producao/IFazendaRepository";

export class ProducaoService {
  constructor(
    private readonly producaoRepository: IProducaoRepository,
    private readonly fazendaRepository: IFazendaRepository,
    private readonly produtoRepository: IProdutoRepository
  ) {}


  async buscarTodos(dto:ProducaoBuscarTodosDTO): Promise<ProducaoBuscarTodosResponseDTO> {
    const response = await this.producaoRepository.buscarTodos(dto);
  
    const producaoCompleta = await Promise.all(
      response.dados.map(async (producao) => {
        const nomeFazenda = await this.fazendaRepository.buscarNome(producao.fazendaId);
        const nomeProduto = await this.produtoRepository.buscarNome(producao.produtoId);
        return {
           ...producao, 
           fazendaNome: nomeFazenda,
           produtoNome: nomeProduto
          } as ProducaoItemDTO;
      })
    );
  
    return {
      dados: producaoCompleta,
      temMais: response.temMais,
      ultimoId: response.ultimoId,
    };
  }

  async inserir(dto: ProducaoInserirDTO): Promise<void> {
    const novaProducao: Producao = {
      id: gerarUUID(),
      quantidade: dto.quantidade,
      status: dto.status as ProducaoStatus,
      criadaEm: new Date(),
      produtoId: dto.produtoId,
      fazendaId: dto.fazendaId,
    };
    await this.producaoRepository.insert(novaProducao);
  }
}
