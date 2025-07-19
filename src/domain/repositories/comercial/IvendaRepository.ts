import { VendaBuscarTodosDTO } from "@/application/dtos/comercial/Venda/VendaBuscarTodosDTO";
import { VendaBuscarTodosResponseDTO } from "@/application/dtos/comercial/Venda/VendaBUscarTodosResponseDTO";
import { Venda } from "@/domain/entities/comercial/Venda";


export interface IVendaRepository {
  buscarPorId(id: string): Promise<Venda | null>;
  buscarTodos(dto: VendaBuscarTodosDTO): Promise<VendaBuscarTodosResponseDTO>;
  inserir(venda: Venda): Promise<void>;
  atualizar(venda: Venda): Promise<void>;
}
