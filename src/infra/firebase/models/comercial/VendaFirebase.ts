import { Timestamp } from "firebase-admin/firestore";
import { VendaStatusEnum } from "@/domain/types/venda.enum";
import { ItemVenda } from "@/domain/entities/comercial/ItemVenda";

export interface VendaFirebase {
  id: string;
  criadaEm: Timestamp;
  dataVenda: Timestamp;
  cliente: string;
  imposto?: number;
  valorTotal: number;
  status: VendaStatusEnum;
  itens: ItemVenda[];
  
}