// domain/interfaces/IEstoqueInsumoService.ts
export interface IEstoqueInsumoService {
    verificarEDebitarEstoque(insumoId: string, quantidade: number): Promise<void>;
  }
  