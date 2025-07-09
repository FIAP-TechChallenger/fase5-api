import { FazendaBuscarTodosDTO } from "@/application/dtos/producao/fazenda/FazendaBuscarTodosDTO";
import { FazendaBuscarTodosResponseDTO } from "@/application/dtos/producao/fazenda/FazendaBuscarTodosResponseDTO";
import { Fazenda } from "@/domain/entities/producao/Fazenda";

export interface IFazendaRepository{
    buscarPorId(id: string): Promise<Fazenda | null>;
    buscarNome(fazendaId: string):Promise<string>;
    buscarTodos(dto:FazendaBuscarTodosDTO): Promise<FazendaBuscarTodosResponseDTO>
    insert(fazenda: Fazenda ): Promise<void>;
    atualizar(fazenda: Fazenda ): Promise<void>;
}


