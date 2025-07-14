
export class EstoqueProduto {
    id: string;
    produtoId: string;
    quantidade: number;
    preco?: number;
    lote?: string;
    criadaEm: Date;
    atualizadaEm: Date;
    producaoId: string;
    

    constructor(obj: EstoqueProduto) {
        this.id = obj.id;
        this.produtoId = obj.produtoId;
        this.quantidade = obj.quantidade;
        this.preco = obj.preco;
        this.criadaEm = obj.criadaEm;
        this.atualizadaEm = obj.atualizadaEm;
        this.producaoId = obj.producaoId;
    }
} 