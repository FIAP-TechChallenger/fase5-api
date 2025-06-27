import { MetaBuscarTodosDTO } from "@/application/dtos/comercial/MetaBuscarTodosDTO";
import { MetaBuscarTodosResponseDTO } from "@/application/dtos/comercial/MetaBuscarTodosResponseDTO";
import { Meta } from "@/domain/entities/comercial/Meta";

export interface IMetaRepository {
  buscarPorId(id: string): Promise<Meta | null>;
  buscarTodos(dto: MetaBuscarTodosDTO): Promise<MetaBuscarTodosResponseDTO>;
  inserir(meta: Meta): Promise<void>;
  atualizar(meta: Meta): Promise<void>;
}
