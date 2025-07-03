import { ProducaoBuscarTodosDTO } from "@/application/dtos/producao/Producao/ProducaoBuscarTodosDTO";
import { ProducaoBuscarTodosResponseDTO } from "@/application/dtos/producao/Producao/ProducaoBuscarTodosResponse";
import { Producao } from "@/domain/entities/producao/Producao";

export interface IProducaoRepository{
   // buscarPorId(id: string): Promise<Fazenda | null>;
   buscarTodos(dto:ProducaoBuscarTodosDTO): Promise<ProducaoBuscarTodosResponseDTO>
   insert(producao: Producao ): Promise<void>;
   // atualizar(fazenda: Fazenda ): Promise<void>;
    // update(userId:string ,producao: Producao): Promise<void>;
}