import { Request, Response } from "express";

// Controller: recebe req, monta res. Sem lógica de banco/service ainda.
export function buscarPorIdController(req: Request, res: Response) {
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
}
