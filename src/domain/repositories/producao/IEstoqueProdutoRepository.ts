import { EstoqueProduto } from "@/domain/entities/producao/EstoqueProduto";

export interface IEstoqueProdutoRepository {
    getAll(): Promise<EstoqueProduto[]>;
    insert(estoqueProduto: EstoqueProduto): Promise<void>;
} 