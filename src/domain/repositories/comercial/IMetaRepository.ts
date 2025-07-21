import { MetaBuscarTodosDTO } from "@/application/dtos/comercial/MetaBuscarTodosDTO";
import { MetaBuscarTodosResponseDTO } from "@/application/dtos/comercial/MetaBuscarTodosResponseDTO";
import { Meta } from "@/domain/entities/comercial/Meta";
import { MetaTipoEnum } from "@/domain/types/meta.enum";
import { DocumentData, DocumentReference } from "firebase-admin/firestore";

export interface IMetaRepository {
  buscarRefPorId(metaId: string): DocumentReference<DocumentData, DocumentData>;
  buscarPorId(id: string): Promise<Meta | null>;
  buscarTodos(dto: MetaBuscarTodosDTO): Promise<MetaBuscarTodosResponseDTO>;
  buscarAtivasHojePorTipo(tipo: MetaTipoEnum): Promise<Meta[]>;
  inserir(meta: Meta): Promise<void>;
  atualizar(meta: Meta): Promise<void>;
}
