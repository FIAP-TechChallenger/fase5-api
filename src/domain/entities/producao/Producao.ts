import { ProducaoStatusEnum } from "@/domain/types/producao.enum";
import { Fazenda } from "./Fazenda";
import { Produto } from "./Produto";

export class Producao {
  id: string;
  quantidade: number;
  status: ProducaoStatusEnum;
  criadaEm: Date;
  produtoId: string;
  fazendaId: string;

  constructor(obj: Producao) {
    this.id = obj.id;
    this.quantidade = obj.quantidade;
    this.status = obj.status;
    this.criadaEm = obj.criadaEm;
    this.produtoId = obj.produtoId;
    this.fazendaId = obj.fazendaId;
  }
}
