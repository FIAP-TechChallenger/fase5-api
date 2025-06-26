import { Medida } from "./Medida";


export class Insumo {
    id: string;
    nome: string;
    unidadeMedida: Medida;
    criadaEm: Date;



    constructor(obj:Insumo){
        this.id = obj.id;
        this.nome = obj.nome;
        this.unidadeMedida = obj.unidadeMedida;
        this.criadaEm = obj.criadaEm
    }
}