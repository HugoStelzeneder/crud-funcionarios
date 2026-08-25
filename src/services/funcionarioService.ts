import type { Funcionario, Departamento, CriarFuncionarioInput, AtualizarFuncionarioInput } from "../types/funcionario";
import { Status } from "../types/funcionario";
import { prisma } from "../db/prisma";

export async function listarFuncionarios(): Promise<Funcionario[]> {
    return await prisma.funcionario.findMany();
}

export async function buscarPorId(id: string): Promise<Funcionario> {
    const funcionario = await prisma.funcionario.findUnique({
        where: { id }
    });
    if (!funcionario) {
        throw new Error("Funcionario não encontrado");
    }
    return funcionario;
}

export async function filtrarPorDepartamento(departamento: Departamento): Promise<Funcionario[]> {
    return await prisma.funcionario.findMany({
        where: { departamento }
    });
}

export async function atualizarFuncionario(id: string, dados: AtualizarFuncionarioInput): Promise<Funcionario> {
    await buscarPorId(id); // lança erro se não achar
    return await prisma.funcionario.update({
        where: { id },
        data: dados
    });
}

export async function demitir(id: string): Promise<Funcionario> {
    await buscarPorId(id); // lança erro se não achar
    return await prisma.funcionario.update({
        where: { id },
        data: { status: Status.INATIVO }
    });
}

export async function criarFuncionario(dados: CriarFuncionarioInput): Promise<Funcionario> {
    // Validações (temporárias — Fase 5 substitui por Zod)
    if (!dados.nome || dados.nome.trim() === "") {
        throw new Error("Nome é obrigatório.");
    }
    if (!dados.sobrenome || dados.sobrenome.trim() === "") {
        throw new Error("Sobrenome é obrigatório.");
    }
    if (!dados.email || !dados.email.includes("@")) {
        throw new Error("Email inválido.");
    }
    if (!dados.cpf || dados.cpf.length < 11) {
        throw new Error("CPF inválido.");
    }
    if (typeof dados.salario !== "number" || dados.salario <= 0) {
        throw new Error("Salário inválido.");
    }

    return await prisma.funcionario.create({
        data: dados
    });
}
