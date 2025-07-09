import { MedidaBuscarTodosDTO } from "@/application/dtos/producao/Medida/MedidaBuscarTodosDTO";
import { MedidaBuscarTodosResponseDTO } from "@/application/dtos/producao/Medida/MedidaBuscarTodosResponseDTO";
import { Medida } from "@/domain/entities/producao/Medida";

export interface IMedidaRepository{
    buscarPorId(id: string): Promise<Medida| null>;
    buscarTodos(dto:MedidaBuscarTodosDTO): Promise<MedidaBuscarTodosResponseDTO>
    inserir(medida: Medida ): Promise<void>;
    buscarSigla(medidaId:string):Promise<string>
    atualizar(medida: Medida ): Promise<void>;
}