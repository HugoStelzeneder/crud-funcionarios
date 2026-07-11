
export enum Departamento {
    ENGENHARIA = "ENGENHARIA",
    PRODUTO = "PRODUTO",
    DESIGN = "DESIGN",
    MARKETING = "MARKETING",
    VENDAS = "VENDAS",
    RH = "RH",
    FINANCEIRO = "FINANCEIRO",
    OPERACOES = "OPERACOES"
}

export enum Status {
    ATIVO = "ATIVO",
    INATIVO = "INATIVO",
    FERIAS = "FERIAS",
    AFASTADO = "AFASTADO",
}


export interface Funcionario {
    readonly id: string;
    nome: string;
    sobrenome: string;
    email: string;
    readonly cpf: string;
    dataNascimento: Date;
    telefone?: string;
    cargo: string;
    departamento: Departamento;
    salario: number;
    dataAdmissao: Date;
    status: Status;
    readonly criadoEm: Date;
    atualizadoEm: Date;

}

export type CriarFuncionarioInput = Omit<Funcionario, "id" | "status" | "criadoEm" | "atualizadoEm">;

export type AtualizarFuncionarioInput = Partial<Omit<Funcionario, "id" | "cpf" | "criadoEm">>;
