import { Router, Request, Response, NextFunction } from "express";
import {
    buscarPorIdController,
    listarController,
    criarController,
    atualizarController,
    demitirController
} from "../controllers/funcionarioController";


const router = Router();

// Middleware específico dessa rota
function validarId(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    if (id === "invalido") {
        res.status(400).json({ erro: "ID inválido" });
        return;
    }

    next();
}

router.get("/", listarController);
router.get("/:id", validarId, buscarPorIdController);
router.post("/", criarController);
router.put("/:id", validarId, atualizarController);
router.delete("/:id", validarId, demitirController);

export { router };
