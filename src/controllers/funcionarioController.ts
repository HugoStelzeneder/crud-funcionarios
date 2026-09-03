import type { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import {
    buscarPorId,
    listarFuncionarios,
    criarFuncionario,
    atualizarFuncionario,
    demitir
} from "../services/funcionarioService";

export async function buscarPorIdController(req: Request, res: Response) {
    try {
        const funcionario = await buscarPorId(req.params.id as string);
        res.status(200).json(funcionario);
    } catch (erro) {
        res.status(404).json({
            erro: "Funcionário não encontrado",
            idBuscado: req.params.id
        });
    }
}

export async function listarController(req: Request, res: Response) {
    const funcionarios = await listarFuncionarios();
    res.status(200).json(funcionarios);
}

export async function criarController(req: Request, res: Response) {
    try {
        const funcionario = await criarFuncionario(req.body);
        res.status(201).json(funcionario);
    } catch (erro) {
        if (erro instanceof Prisma.PrismaClientKnownRequestError) {
            if (erro.code === "P2002") {
                const campo = (erro.meta?.target as string[])?.join(", ") ?? "campo único";
                return res.status(409).json({
                    erro: "Conflito de dados",
                    detalhe: `Já existe funcionário com esse ${campo}.`
                });
            }
        }
        res.status(500).json({
            erro: "Erro interno ao criar funcionário",
            detalhe: (erro as Error).message
        });
    }
}

export async function atualizarController(req: Request, res: Response) {
    try {
        const funcionario = await atualizarFuncionario(req.params.id as string, req.body);
        res.status(200).json(funcionario);
    } catch (erro) {
        if (erro instanceof Prisma.PrismaClientKnownRequestError) {
            if (erro.code === "P2002") {
                return res.status(409).json({
                    erro: "Conflito de dados",
                    detalhe: "Já existe funcionário com esses dados únicos."
                });
            }
        }
        res.status(404).json({
            erro: "Erro ao atualizar",
            detalhe: (erro as Error).message
        });
    }
}

export async function demitirController(req: Request, res: Response) {
    try {
        const funcionario = await demitir(req.params.id as string);
        res.status(200).json(funcionario);
    } catch (erro) {
        res.status(404).json({
            erro: "Erro ao demitir",
            detalhe: (erro as Error).message
        });
    }
}
