

export class Insumo {
    id: string;
    nome: string;
    unidadeMedidaId: string;
    unidadeMedidaSigla?: string; 
    criadaEm: Date;



    constructor(obj:Insumo){
        this.id = obj.id;
        this.nome = obj.nome;
        this.unidadeMedidaId = obj.unidadeMedidaId;
        this.unidadeMedidaSigla = obj.unidadeMedidaSigla;
        this.criadaEm = obj.criadaEm
    }
}