import { ProdutoBuscarTodosDTO } from "@/application/dtos/producao/Produto/ProdutoBuscarTodosDTO";
import { ProdutoBuscarTodosResponseDTO } from "@/application/dtos/producao/Produto/ProdutoBuscarTodosResponseDTO";
import { Produto } from "@/domain/entities/producao/Produto";

export interface IProdutoRepository{
      buscarPorId(id: string): Promise<Produto | null>;
      buscarNome(nomeId: string):Promise<string>;
      buscarTodos(dto:ProdutoBuscarTodosDTO): Promise<ProdutoBuscarTodosResponseDTO>
      insert(produto:Produto ): Promise<void>;
      atualizar(produto: Produto ): Promise<void>;
  


}