export interface IEstoqueProdutoService {
    verificarEDebitarEstoque(produtoId: string, quantidade: number): Promise<void>;
  }