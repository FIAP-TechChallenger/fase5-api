import { Medida } from "./Medida";

export class Produto {
    id:string;
    nome:string;
    unidadeMedidaId:string; 
    criadaEm: Date;

    constructor(obj:Produto){
        this.id= obj.id
        this.nome = obj.nome
        this.unidadeMedidaId = obj.unidadeMedidaId
        this.criadaEm = obj.criadaEm

    }
}