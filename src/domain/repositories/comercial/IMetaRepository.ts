import { Meta } from "@/domain/entities/comercial/Meta";

export interface IMetaRepository {
  inserir(meta: Meta): Promise<void>;
  atualizar(meta: Meta): Promise<void>;
  buscarPorId(id: string): Promise<Meta | null>;
}
