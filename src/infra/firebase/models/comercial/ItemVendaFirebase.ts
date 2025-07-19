export interface ItemVendaFirebase {
  id: string;
  desconto: number;
  quantidade: number;
  produtoId: string;
  fazendaId?: string;
  precoUnitario: number;
  lucroUnitario: number;
}