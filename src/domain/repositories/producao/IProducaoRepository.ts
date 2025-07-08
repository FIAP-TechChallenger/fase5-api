import { ProducaoBuscarTodosDTO } from "@/application/dtos/producao/Producao/ProducaoBuscarTodosDTO";
import { ProducaoBuscarTodosResponseDTO } from "@/application/dtos/producao/Producao/ProducaoBuscarTodosResponse";
import { Producao } from "@/domain/entities/producao/Producao";

export interface IProducaoRepository{
   buscarPorId(id: string): Promise<Producao | null>;
   buscarTodos(dto:ProducaoBuscarTodosDTO): Promise<ProducaoBuscarTodosResponseDTO>
   insert(producao: Producao ): Promise<void>;
   atualizar(producao : Producao ): Promise<void>;
   
}