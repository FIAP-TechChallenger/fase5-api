import { Venda } from "@/domain/entities/comercial/Venda";


export interface VendaBuscarTodosResponseDTO {
  dados: Venda[];
  ultimoId: string;
  temMais: boolean;
}
