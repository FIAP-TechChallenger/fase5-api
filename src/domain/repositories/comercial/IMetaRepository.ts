import { Meta } from "@/domain/entities/comercial/Meta";

export interface IMetaRepository {
  buscarPorId(id: string): Promise<Meta | null>;
  buscarTodos(): Promise<Meta[]>;
  inserir(meta: Meta): Promise<void>;
  atualizar(meta: Meta): Promise<void>;
}
