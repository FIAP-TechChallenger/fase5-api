import { MetaBuscarTodosDTO } from "@/application/dtos/comercial/MetaBuscarTodosDTO";
import { MetaBuscarTodosResponseDTO } from "@/application/dtos/comercial/MetaBuscarTodosResponseDTO";
import { Meta } from "@/domain/entities/comercial/Meta";
import { MetaTipoEnum } from "@/domain/types/meta.enum";

export interface IMetaRepository {
  buscarPorId(id: string): Promise<Meta | null>;
  buscarTodos(dto: MetaBuscarTodosDTO): Promise<MetaBuscarTodosResponseDTO>;
  buscarPorPeriodoETipo(data: Date, tipo: MetaTipoEnum): Promise<Meta[]>;
  inserir(meta: Meta): Promise<void>;
  atualizar(meta: Meta): Promise<void>;
}
