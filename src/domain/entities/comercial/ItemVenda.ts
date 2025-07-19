
export class ItemVenda {
  id: string;
  desconto: number;
  quantidade: number;
  produtoId: string;
  fazendaId?: string;
  precoUnitario: number;
  lucroUnitario: number

  constructor(obj: ItemVenda) {
    this.id = obj.id;
    this.desconto = obj.desconto;
    this.quantidade = obj.quantidade;
    this.produtoId = obj.produtoId;
    this.fazendaId = obj.fazendaId;
    this.precoUnitario = obj.precoUnitario;
    this.lucroUnitario = obj.lucroUnitario;
  }
}
