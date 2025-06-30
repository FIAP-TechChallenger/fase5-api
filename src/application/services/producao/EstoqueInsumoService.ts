import { gerarUUID } from "@/shared/utils/gerarUUID";
import { IEstoqueInsumoRepository } from "@/domain/repositories/producao/IEstoqueInsumoRepository";
import { EstoqueInsumo } from "@/domain/entities/producao/EstoqueInsumo";
import { EstoqueInsumoInserirDTO } from "@/application/dtos/producao/EstoqueInsumoInserirDTO";

export class EstoqueInsumoService {
  constructor(private readonly estoqueInsumoRepository: IEstoqueInsumoRepository) {}

  async getAll(): Promise<EstoqueInsumo[]> {
    return this.estoqueInsumoRepository.getAll();
  }

  async inserir(dto: EstoqueInsumoInserirDTO): Promise<void> {
    const novoEstoque: EstoqueInsumo = {
      id: gerarUUID(),
      insumoId:dto.insumoId ?? "",
      quantidade:dto.quantidade,
      preco:dto.preco,
      criadaEm: new Date(),
   
    };
    await this.estoqueInsumoRepository.insert(novoEstoque);
  }
}

