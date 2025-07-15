import { ColheitaBuscarTodosDTO } from "@/application/dtos/producao/Colheita/ColheitaBuscarTodosDTO";
import { ColheitaBuscarTodosResponseDTO } from "@/application/dtos/producao/Colheita/ColheitaBuscarTodosResponseDTO";
import { EstoqueInsumoBuscarTodosDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoBuscarTodosDTO";
import { EstoqueInsumoBuscarTodosResponseDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoBuscarTodosResponseDTO";
import { Colheita } from "@/domain/entities/producao/Colheita";
import { EstoqueInsumo } from "@/domain/entities/producao/EstoqueInsumo";

export interface IColheitaRepository{
   buscarPorId(id: string): Promise<Colheita | null>;
   buscarTodos(dto:ColheitaBuscarTodosDTO): Promise<ColheitaBuscarTodosResponseDTO>
   insert(colheita: Colheita ): Promise<void>;
   
 }


