import { DecodedIdToken } from "firebase-admin/auth";
import { Request } from "express";
import { Usuario } from "@/domain/entities/outros/Usuario";

declare module "express-serve-static-core" {
  interface Request {
    user: Usuario;
  }
}
