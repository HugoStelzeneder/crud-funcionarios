import { Router, Request, Response, NextFunction } from "express";
import { buscarPorIdController } from "../controllers/funcionarioController";


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

router.get("/:id", validarId, buscarPorIdController);

export { router };
