

export class Insumo {
    id: string;
    nome: string;
    unidadeMedidaId: string;
    criadaEm: Date;



    constructor(obj:Insumo){
        this.id = obj.id;
        this.nome = obj.nome;
        this.unidadeMedidaId = obj.unidadeMedidaId;
        this.criadaEm = obj.criadaEm
    }
}