// import { Request, Response } from "express";
// import { z } from "zod";
// import { getFirestore } from "firebase-admin/firestore";

// const schema = z.object({
//   type: z.enum(["deposit", "transfer"]),
//   value: z.number().positive(),
// });

// export async function createTransaction(req: Request, res: Response) {
//   const result = schema.safeParse(req.body);
//   if (!result.success) {
//     return res.status(400).json({ errors: result.error.errors });
//   }

//   const db = getFirestore();
//   const { type, value } = result.data;

//   await db.collection("transactions").add({
//     type,
//     value,
//     date: new Date(),
//     userId: req.user.uid,
//   });

//   res.status(201).json({ message: "Transaction saved" });
// }
