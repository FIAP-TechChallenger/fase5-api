import { VendaStatusEnum } from "@/domain/types/venda.enum";
import { ItemVenda } from "./ItemVenda";


export class Venda {
  id: string;
  criadaEm: Date;
  dataVenda: Date;
  cliente: string;
  imposto?: number;
  valorTotal: number;
  status: VendaStatusEnum;
  itens: ItemVenda[];

  

  constructor(obj: Venda) {
    this.id = obj.id;
    this.criadaEm = obj.criadaEm;
    this.dataVenda = obj.dataVenda;
    this.cliente = obj.cliente;
    this.imposto = obj.imposto;
    this.valorTotal = obj.valorTotal;
    this.status = obj.status;
    this.itens = obj.itens;

  }
}
