import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";

export function validar(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const resultado = schema.safeParse(req.body);

        if (!resultado.success) {
            return res.status(400).json({
                erro: "Dados inválidos",
                detalhes: resultado.error.issues.map((issue) => ({
                    campo: issue.path.join("."),
                    mensagem: issue.message
                }))
            });
        }

        req.body = resultado.data;
        next();
    };
}
