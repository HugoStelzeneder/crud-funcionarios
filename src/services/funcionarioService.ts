import { Departamento, Status } from "../types/funcionario";

import type {
    Funcionario,
    CriarFuncionarioInput,
    AtualizarFuncionarioInput,
} from "../types/funcionario";

const funcionarios: Funcionario[] = [];

function esperar(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function listarFuncionarios(): Promise<Funcionario[]> {
    await esperar(300);
    return funcionarios;
}

export async function buscarPorId(id: string): Promise<Funcionario> {
    await esperar(300)
    const funcionarioEncontrado = funcionarios.find(func => func.id === id);
    if (funcionarioEncontrado) {
        return funcionarioEncontrado;
    } else {
        throw new Error("Funcionario não encontrado")
    }
}

export async function atualizarFuncionario(id: string, dados: AtualizarFuncionarioInput): Promise<Funcionario> {
    const funcionario = await buscarPorId(id);

    Object.assign(funcionario, dados);
    funcionario.atualizadoEm = new Date();

    return funcionario;
}

export async function filtrarPorDepartamento(departamento: Departamento): Promise<Funcionario[]> {
    await esperar(300);
    const funcionariosDoDepartamento = funcionarios.filter(func => func.departamento === departamento);
    return funcionariosDoDepartamento;
}

export async function demitir(id: string): Promise<Funcionario> {
    const funcionario = await buscarPorId(id);
    funcionario.status = Status.INATIVO;
    funcionario.atualizadoEm = new Date();
    return funcionario;
}

export async function criarFuncionario(dados: CriarFuncionarioInput): Promise<Funcionario> {
    //validação temporaria - Zod futuramente
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

    await esperar(500);

    const agora = new Date();
    const novoFuncionario: Funcionario = {
        id: crypto.randomUUID(),
        ...dados,
        status: Status.ATIVO,
        criadoEm: agora,
        atualizadoEm: agora
    };

    funcionarios.push(novoFuncionario);
    return novoFuncionario;
}
