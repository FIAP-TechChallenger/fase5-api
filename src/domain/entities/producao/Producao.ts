import { ProducaoStatusEnum } from "@/domain/types/producao.enum";


export class Producao {
  id: string;
  quantidadePlanejada: number;
  status: ProducaoStatusEnum;
  lote: string;
  criadaEm: Date;
  atualizadaEm: Date;
  produtoId: string;
  fazendaId: string;
  colheitaId?: string;
  insumos: { 
    insumoId: string;
    quantidade: number;
}[];
  precoPlanejado?:number;
  dataInicio: Date;
  dataFim: Date;

  constructor(obj: Producao) {
    this.id = obj.id;
    this.quantidadePlanejada = obj.quantidadePlanejada;
    this.status = obj.status;
    this.criadaEm = obj.criadaEm;
    this.lote = obj.lote;
    this.produtoId = obj.produtoId;
    this.fazendaId = obj.fazendaId;
    this.insumos = obj.insumos || [];
    this.precoPlanejado = obj.precoPlanejado ?? 0;
    this.atualizadaEm = obj.atualizadaEm;
    this.dataInicio = obj.dataInicio;
    this.dataFim = obj.dataFim;
    this.colheitaId= obj.colheitaId;
  }
}
