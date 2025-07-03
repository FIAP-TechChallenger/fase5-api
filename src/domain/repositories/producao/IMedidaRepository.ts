import { MedidaBuscarTodosDTO } from "@/application/dtos/producao/Medida/MedidaBuscarTodosDTO";
import { MedidaBuscarTodosResponseDTO } from "@/application/dtos/producao/Medida/MedidaBuscarTodosResponseDTO";
import { Medida } from "@/domain/entities/producao/Medida";

export interface IMedidaRepository{
    // buscarPorId(id: string): Promise<Fazenda | null>;
    buscarTodos(dto:MedidaBuscarTodosDTO): Promise<MedidaBuscarTodosResponseDTO>
    insert(medida: Medida ): Promise<void>;
    // atualizar(fazenda: Fazenda ): Promise<void>;
}