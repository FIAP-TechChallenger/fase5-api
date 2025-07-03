import { Medida } from "@/domain/entities/producao/Medida";




export interface MedidaBuscarTodosResponseDTO {
    dados: Medida[];
    ultimoId: string;
    temMais: boolean;
  }
  