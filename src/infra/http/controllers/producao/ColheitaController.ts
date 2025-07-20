// import { ColheitaInserirSchema } from "@/application/dtos/producao/Colheita/ColheitaInserirDTO";
// import { ColheitaService } from "@/application/services/producao/ColheitaService";
// import { Request, Response, Router } from "express";
// import { z, ZodError } from "zod";
// import { verificarPermissaoSetor } from "../../middlewares/SetorMiddleware";
// import { UsuarioSetorEnum } from "@/domain/types/usuario.enum";
// import { FirebaseColheitaRepository } from "@/infra/repositories/producao/firebaseColheitarepository";
// import { ColheitaBuscarTodosSchema } from "@/application/dtos/producao/Colheita/ColheitaBuscarTodosDTO";

// export class ColheitaController {
//   private _colheitaService: ColheitaService;

//   constructor() {
    
//     this._colheitaService = new ColheitaService(
//    new FirebaseColheitaRepository
//     );
//   }
//   async buscarTodos(req: Request, res: Response): Promise<void> {
//     try {
//       const dto = ColheitaBuscarTodosSchema.parse(req.body);
//       const colheitas = await this._colheitaService.buscarTodos(dto);
//       res.status(200).json(colheitas);
//     } catch (error) {
//       console.error("Erro ao buscar colheitas:", error);
//       let message = "Erro ao buscar colheitas";
//       if (error instanceof ZodError) {
//         message = error.message;
//       }
//       res.status(500).json({ message: "Erro ao buscar  colheitas" });
//     }
//   }
//   async inserir(req: Request, res: Response): Promise<void> {
//     try {
//       const dto = ColheitaInserirSchema.parse(req.body);
//       await this._colheitaService.inserir(dto);
//       res.status(201).json({ message: "Colheita criada com sucesso" });
//     } catch (error: any) {
//       if (error instanceof z.ZodError) {
//         res.status(400).json({
//           message: "Erro de validação",
//           erros: error.errors.map((err) => ({
//             campo: err.path.join("."),
//             mensagem: err.message,
//           })),
//         });
//         return;
//       }
//       console.error("Erro ao inserir colheita:", error);
//       res.status(500).json({ message: "Erro interno no servidor" });
//     }
//   }

// //   async atualizar(req: Request, res: Response): Promise<void> {
// //     try {
// //       const dto = ColheitaAtualizarSchema.parse(req.body);
// //       await this._colheitaService.atualizar(dto);
// //       res.status(200).json({ message: "Colheita atualizada com sucesso" });
// //     } catch (error: any) {
// //       if (error instanceof z.ZodError) {
// //         res.status(400).json({
// //           message: "Erro de validação",
// //           erros: error.errors.map((err) => ({
// //             campo: err.path.join("."),
// //             mensagem: err.message,
// //           })),
// //         });
// //         return;
// //       }
// //       res.status(500).json({ message: "Erro interno no servidor" });
// //     }
// //   }

//   static routes() {
//     const router = Router();
//     const controller = new ColheitaController();

//     router.post("/", controller.buscarTodos.bind(controller));

//     router.use(
//       verificarPermissaoSetor(UsuarioSetorEnum.ADMIN, UsuarioSetorEnum.PRODUCAO)
//     );
//     router.post("/inserir", controller.inserir.bind(controller));
//     router.post("/atualizar", controller.atualizar.bind(controller));

//     return router;
//   }
// }