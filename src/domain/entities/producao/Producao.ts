import { ProducaoStatus } from "@/domain/types/producaoStatus.enum";
import { Fazenda } from "./Fazenda";
import { Produto } from "./Produto";

export class Producao {
    id: string;
    quantidade: number;
    status: ProducaoStatus;
    criadaEm: Date;
    produto: Produto;
    fazenda: Fazenda ;

    constructor(obj:Producao){
        this.id = obj.id;
        this.quantidade = obj.quantidade;
        this.status = obj.status;
        this.criadaEm = obj.criadaEm;
        this.produto = obj.produto;
        this.fazenda= obj.fazenda

        
    }

}