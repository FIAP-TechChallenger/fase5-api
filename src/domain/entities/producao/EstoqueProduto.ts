
export class EstoqueProduto {
    id: string;
    produtoId: string;
    quantidade: number;
    preco?: number;
    criadaEm: Date;

    constructor(obj: EstoqueProduto) {
        this.id = obj.id;
        this.produtoId = obj.produtoId;
        this.quantidade = obj.quantidade;
        this.preco = obj.preco;
        this.criadaEm = obj.criadaEm
    }
} 