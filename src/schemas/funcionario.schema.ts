import { z } from "zod";

// Schema pra criar (POST /funcionarios)
export const criarFuncionarioSchema = z.object({
    nome: z.string().min(1, "Nome obrigatório"),
    sobrenome: z.string().min(1, "Sobrenome obrigatório"),
    email: z.string().email("Email inválido"),
    cpf: z.string().refine(
        (cpf) => cpf.replace(/\D/g, "").length === 11,
        "CPF deve ter 11 dígitos"
    ),
    dataNascimento: z.coerce.date().refine(
        (data) => {
            const idade = new Date().getFullYear() - data.getFullYear();
            return idade >= 18;
        },
        "Deve ter pelo menos 18 anos"
    ),
    telefone: z.string().optional(),
    cargo: z.string().min(1, "Cargo obrigatório"),
    departamento: z.enum([
        "ENGENHARIA", "PRODUTO", "DESIGN", "MARKETING",
        "VENDAS", "RH", "FINANCEIRO", "OPERACOES"
    ]),
    salario: z.number().positive("Salário deve ser positivo"),
    dataAdmissao: z.coerce.date()
});

// Schema pra atualizar (PUT /funcionarios/:id)
// Todos os campos opcionais + não permite mudar cpf
export const atualizarFuncionarioSchema = z.object({
    nome: z.string().min(1).optional(),
    sobrenome: z.string().min(1).optional(),
    email: z.string().email().optional(),
    dataNascimento: z.coerce.date().optional(),
    telefone: z.string().optional(),
    cargo: z.string().min(1).optional(),
    departamento: z.enum([
        "ENGENHARIA", "PRODUTO", "DESIGN", "MARKETING",
        "VENDAS", "RH", "FINANCEIRO", "OPERACOES"
    ]).optional(),
    salario: z.number().positive().optional(),
    dataAdmissao: z.coerce.date().optional(),
    status: z.enum(["ATIVO", "INATIVO", "FERIAS", "AFASTADO"]).optional()
});
