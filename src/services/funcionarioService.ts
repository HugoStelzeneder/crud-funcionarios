import { Funcionario, Departamento, Status, CriarFuncionarioInput } from "../types/funcionario";

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
    funcionario.atualizadoEm = new Date();
    return funcionario;
}

async function criarFuncionario(dados: CriarFuncionarioInput): Promise<Funcionario> {
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