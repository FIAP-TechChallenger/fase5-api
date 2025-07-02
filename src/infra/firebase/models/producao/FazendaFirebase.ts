// src/infra/firebase/models/FazendaFirebase.ts
import { Timestamp } from "firebase-admin/firestore";

export interface FazendaFirebase {
  nome: string
  criadaEm: Timestamp 
  atualizadaEm: Timestamp 
}