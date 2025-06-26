export class Medida{
    id: string;
    nome: string;
    sigla : string;
    criadaEm: Date;

    constructor(obj:Medida){
        this.id = obj.id;
        this.nome = obj.nome;
        this.sigla = obj.sigla;
        this.criadaEm = obj.criadaEm
    }

}