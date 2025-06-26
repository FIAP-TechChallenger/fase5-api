import { Insumo } from "./Insumo";

export class EstoqueInsumo {
    id: string ;
    insumo: Insumo;
    quantidade:number;
    preco:number;
    criadaEm: Date;


    constructor(obj:EstoqueInsumo){
        this.id = obj.id,
        this.insumo = obj.insumo,
        this.quantidade = obj.quantidade,
        this.preco = obj.preco;
        this.criadaEm = obj.criadaEm


    }
}