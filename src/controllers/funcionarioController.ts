import { Request, Response } from "express";
import {
    buscarPorId,
    listarFuncionarios,
    criarFuncionario,
    atualizarFuncionario,
    demitir
} from "../services/funcionarioService";

export async function buscarPorIdController(req: Request, res: Response) {
    const id = req.params.id as string;

    try {
        const funcionario = await buscarPorId(id);
        res.status(200).json(funcionario);
    } catch (erro) {
        res.status(404).json({
            erro: "Funcionário não encontrado",
            idBuscado: id
        });
    }
}

export async function listarController(req: Request, res: Response) {
    const funcionarios = await listarFuncionarios();
    res.status(200).json(funcionarios);
}

export async function criarController(req: Request, res: Response) {
    try {
        const dados = req.body;

        // Converte strings de data pra Date
        dados.dataNascimento = new Date(dados.dataNascimento);
        dados.dataAdmissao = new Date(dados.dataAdmissao);

        const funcionario = await criarFuncionario(dados);
        res.status(201).json(funcionario);
    } catch (erro) {
        res.status(400).json({
            erro: "Erro ao criar funcionário",
            detalhe: (erro as Error).message
        });
    }
}

// atualizar
export async function atualizarController(req: Request, res: Response) {
    const id = req.params.id as string;

    try {
        const funcionario = await atualizarFuncionario(id, req.body);
        res.status(200).json(funcionario);
    } catch (erro) {
        res.status(404).json({
            erro: "Erro ao atualizar",
            detalhe: (erro as Error).message
        });
    }
}

// demitir
export async function demitirController(req: Request, res: Response) {
    const id = req.params.id as string;

    try {
        const funcionario = await demitir(id);
        res.status(200).json(funcionario);
    } catch (erro) {
        res.status(404).json({
            erro: "Erro ao demitir",
            detalhe: (erro as Error).message
        });
    }
}
