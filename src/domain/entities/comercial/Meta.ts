import {
  MetaStatusEnum,
  MetaTipoEnum,
  MetaCalculoPorEnum,
} from "@/domain/types/meta.enum";

export class Meta {
  id: string;
  titulo: string;
  descricao: string;
  tipo: MetaTipoEnum;
  valorAlvo: number;
  valorAtual: number;
  dataInicio: Date;
  dataFim: Date;
  status: MetaStatusEnum;
  calculoPor: MetaCalculoPorEnum;
  usuarioId: string;
  criadaEm: Date;
  atualizadaEm: Date;
  fazendaId: string | null;

  constructor(obj: Meta) {
    this.id = obj.id;
    this.titulo = obj.titulo;
    this.descricao = obj.descricao;
    this.tipo = obj.tipo;
    this.valorAlvo = obj.valorAlvo;
    this.valorAtual = obj.valorAtual;
    this.dataInicio = obj.dataInicio;
    this.dataFim = obj.dataFim;
    this.status = obj.status;
    this.calculoPor = obj.calculoPor;
    this.usuarioId = obj.usuarioId;
    this.criadaEm = obj.criadaEm;
    this.atualizadaEm = obj.atualizadaEm;
    this.fazendaId = obj.fazendaId;
  }
}
