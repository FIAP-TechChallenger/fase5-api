
export class EstoqueInsumo {
    id: string ;
    insumoId: string;
    quantidade:number;
    preco:number;
    criadaEm: Date;
    atualizadaEm: Date;


    constructor(obj:EstoqueInsumo){
        this.id = obj.id,
        this.insumoId = obj.insumoId,
        this.quantidade = obj.quantidade,
        this.preco = obj.preco,
        this.criadaEm = obj.criadaEm,
        this.atualizadaEm = obj.atualizadaEm


    }
}