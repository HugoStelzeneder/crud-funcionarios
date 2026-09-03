import type { Funcionario, Departamento } from "../types/funcionario";
import type { CriarFuncionarioInput, AtualizarFuncionarioInput } from "../schemas/funcionario.schema";
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
    await buscarPorId(id);
    return await prisma.funcionario.update({
        where: { id },
        data: dados
    });
}

export async function demitir(id: string): Promise<Funcionario> {
    await buscarPorId(id);
    return await prisma.funcionario.update({
        where: { id },
        data: { status: Status.INATIVO }
    });
}

export async function criarFuncionario(dados: CriarFuncionarioInput): Promise<Funcionario> {
    return await prisma.funcionario.create({
        data: dados
    });
}
