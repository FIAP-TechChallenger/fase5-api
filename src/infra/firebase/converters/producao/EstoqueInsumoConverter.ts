// import { EstoqueInsumo } from "@/domain/entities/producao/EstoqueInsumo";
// import { Timestamp } from "firebase-admin/firestore";

// export class EstoqueInsumoConverter {
//   static toFirestore(estoqueInsumo: EstoqueInsumo): EstoqueInsumoFirebase {
//     return {
//         insumo:estoqueInsumo.insumo,
//         quantidade: estoqueInsumo.quantidade,
//         preco: estoqueInsumo.preco,
//         criadaEm: this._toTimestamp(estoqueInsumo.criadaEm), 
     
//     };
//   }

//   static fromFirestore(data: EstoqueInsumoFirebase, id: string): EstoqueInsumo {
//     return new EstoqueInsumo({
//       id,
//       insumo:data.insumo,
//       quantidade: data.quantidade,
//       preco: data.preco,
//       criadaEm: data.criadaEm?.toDate() || new Date(),
      
//     });
//   }

//   private static _toTimestamp(date?: Date): Timestamp | null {
//     return date ? Timestamp.fromDate(date) : null;
//   }
// }