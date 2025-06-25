import { Fazenda } from "@/domain/entities/producao/Fazenda";

export interface IFazendaRepository{
    getAll(): Promise<Fazenda[]>
    insert(fazenda: Fazenda ): Promise<void>
}