import { Produto } from "@/domain/entities/producao/Produto";

export interface IProdutoRepository{
    getAll(): Promise<Produto[]>;
    insert(produto : Produto): Promise<void>;
    // exists(userId: string , produtoId: string): Promise<boolean>


}