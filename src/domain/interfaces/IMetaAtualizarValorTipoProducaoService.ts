export interface MetaAtualizarValorTipoProducaoParams {
  qtdColhida: number;
  data?: Date; // opcional (padrão: hoje)
}

export interface IMetaAtualizarValorTipoProducaoService {
  executar(dados: MetaAtualizarValorTipoProducaoParams): Promise<void>;
}
