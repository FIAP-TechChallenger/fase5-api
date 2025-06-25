export class Fazenda {
    id: string
    nome: string
    criadaEm?: Date // Exemplo de campo adicional
    atualizadaEm?: Date
  
    constructor(obj: Partial<Fazenda>){
      this.id = obj.id || ""
      this.nome = obj.nome || ""
      this.criadaEm = obj.criadaEm
      this.atualizadaEm = obj.atualizadaEm
    }
  }