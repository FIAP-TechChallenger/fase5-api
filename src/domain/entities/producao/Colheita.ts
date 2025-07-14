export class Colheita {
    quantidadeColhida: number;
    perdas: number;
    custoProducao?: number;
    preco: number;
    producaoId:string;
    dataInicio: Date;
    dataFim: Date;

    constructor(obj: Colheita) {
        this.quantidadeColhida = obj.quantidadeColhida;
        this.perdas = obj.perdas;
        this.custoProducao = obj.custoProducao;
        this.preco = obj.preco;
        this.producaoId = obj.producaoId;
        this.dataInicio = obj.dataInicio;
        this.dataFim = obj.dataFim;
        
    }
}