import {
  MetaTipoEnum,
  MetaCalculoPorEnum,
  MetaStatusEnum,
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
  calculoPor: MetaCalculoPorEnum;
  usuarioId: string;
  criadaEm: Date;
  atualizadaEm: Date;
  status: MetaStatusEnum;

  constructor(obj: Meta) {
    this.id = obj.id;
    this.titulo = obj.titulo;
    this.descricao = obj.descricao;
    this.tipo = obj.tipo;
    this.valorAlvo = obj.valorAlvo;
    this.valorAtual = obj.valorAtual;
    this.dataInicio = obj.dataInicio;
    this.dataFim = obj.dataFim;
    this.calculoPor = obj.calculoPor;
    this.usuarioId = obj.usuarioId;
    this.criadaEm = obj.criadaEm;
    this.atualizadaEm = obj.atualizadaEm;
    this.status = obj.status;
  }
}
