export interface MetaAtualizarValorTipoProducaoParams {
  qtdColhida: number;
}

export interface IMetaAtualizarValorTipoProducaoService {
  executar(dados: MetaAtualizarValorTipoProducaoParams): Promise<void>;
}
