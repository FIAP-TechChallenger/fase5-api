export class Fazenda {
    id: string
    nome: string
    criadaEm: Date 
    atualizadaEm: Date
  
    constructor(obj: Fazenda){
      this.id = obj.id ,
      this.nome = obj.nome, 
      this.criadaEm = obj.criadaEm,
      this.atualizadaEm = obj.atualizadaEm
    }
  }

  