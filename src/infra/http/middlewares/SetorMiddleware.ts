import { Request, Response, NextFunction } from "express";
import { UsuarioSetorEnum } from "@/domain/types/usuario.enum";

/**
 * Middleware que valida se o usuário pertence a um dos setores permitidos.
 * @param setoresPermitidos Lista de setores com permissão de acesso
 */
export function verificarPermissaoSetor(
  ...setoresPermitidos: UsuarioSetorEnum[]
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!setoresPermitidos.includes(user.setor)) {
      res.status(403).json({ message: "Usuário sem autorização" });
      return;
    }

    next();
  };
}
