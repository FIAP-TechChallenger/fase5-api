import { Timestamp } from "firebase-admin/firestore";

export function getFirebaseTimeStamp(date: Date) {
  return Timestamp.fromDate(date instanceof Date ? date : new Date(date));
}
