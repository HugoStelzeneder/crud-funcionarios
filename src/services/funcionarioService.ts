import { Funcionario, Departamento, Status } from "../types/funcionario";

const funcionarios: Funcionario[] = [];

function esperar(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function listarFuncionarios(): Promise<Funcionario[]> {
    await esperar(300);
    return funcionarios;
}

async function buscarPorId(id: string): Promise<Funcionario> {
    await esperar(300)
    const funcionarioEncontrado = funcionarios.find(func => func.id === id);
    if (funcionarioEncontrado) {
        return funcionarioEncontrado;
    } else {
        throw new Error("Funcionario não encontrado")
    }
}

async function filtrarPorDepartamento(departamento: Departamento): Promise<Funcionario[]> {
    await esperar(300);
    const funcionariosDoDepartamento = funcionarios.filter(func => func.departamento === departamento);
    return funcionariosDoDepartamento;
}

async function demitir(id: string): Promise<Funcionario> {
    const funcionario = await buscarPorId(id);
    funcionario.status = Status.INATIVO;
    return funcionario;
}