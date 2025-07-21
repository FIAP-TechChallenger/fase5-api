import { MetaTipoEnum } from "../types/meta.enum";

export interface MetaAtualizarValorPorTipoParams {
  quantidade: number;
  valor?: number;
}

export interface IMetaAtualizarValorPorTipoService {
  executar(
    tipo: MetaTipoEnum,
    dados: MetaAtualizarValorPorTipoParams
  ): Promise<void>;
}
