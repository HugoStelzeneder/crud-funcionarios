import { Router, Request, Response, NextFunction } from "express";

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

// GET /funcionarios/:id
router.get("/:id", validarId, (req, res) => {
    const id = req.params.id;

    if (id === "0") {
        res.status(404).json({
            erro: "Funcionário não encontrado",
            idBuscado: id
        });
        return;
    }

    res.status(200).json({
        id: id,
        nome: "Funcionário Exemplo",
        mensagem: `Funcionário ${id} encontrado`
    });
});

export { router };
