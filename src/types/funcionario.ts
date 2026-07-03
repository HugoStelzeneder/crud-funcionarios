
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
    id: string;
    nome: string;
    sobrenome: string;
    email: string;
    cpf: string;
    dataNascimento: Date;
    telefone?: string;
    cargo: string;
    departamento: Departamento;
    salario: number;
    dataAdmissao: Date;
    status: Status;
    criadoEm: Date;
    atualizadoEm: Date;

}