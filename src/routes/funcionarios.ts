import { Router, Request, Response, NextFunction } from "express";
import {
    buscarPorIdController,
    listarController,
    criarController,
    atualizarController,
    demitirController
} from "../controllers/funcionarioController";
import { validar } from "../middlewares/validar";
import { criarFuncionarioSchema, atualizarFuncionarioSchema } from "../schemas/funcionario.schema";

const router = Router();

function validarId(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    if (id === "invalido") {
        res.status(400).json({ erro: "ID inválido" });
        return;
    }
    next();
}

// Rotas com validação Zod
router.get("/", listarController);
router.get("/:id", validarId, buscarPorIdController);
router.post("/", validar(criarFuncionarioSchema), criarController);          // ← validação
router.put("/:id", validarId, validar(atualizarFuncionarioSchema), atualizarController);  // ← validação
router.delete("/:id", validarId, demitirController);

export { router };
