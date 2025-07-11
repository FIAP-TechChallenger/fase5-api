export interface MetaAtualizarValorTipoProducaoParams {
  usuarioId: string;
  quantidade: number;
  valorTotal: number; // usado apenas se calculoPor === VALOR
  data?: Date; // opcional (padrão: hoje)
}

export interface IMetaAtualizarValorTipoProducaoService {
  executar(dados: MetaAtualizarValorTipoProducaoParams): Promise<void>;
}
