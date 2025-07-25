import { Medida } from "./Medida";

export class Produto {
    id:string;
    nome:string;
    unidadeMedidaId:string; 
    unidadeMedidaSigla?: string; 
    criadaEm: Date;
    insumos?: string[];

    constructor(obj:Produto){
        this.id= obj.id
        this.nome = obj.nome
        this.unidadeMedidaId = obj.unidadeMedidaId
        this.unidadeMedidaSigla = obj.unidadeMedidaSigla
        this.criadaEm = obj.criadaEm
        this.insumos = obj.insumos??[]

    }
}