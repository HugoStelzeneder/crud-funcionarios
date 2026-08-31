import { z } from "zod";

// Schema completo do funcionário
const funcionarioSchema = z.object({
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

// Tipo GERADO automaticamente
type FuncionarioInput = z.infer<typeof funcionarioSchema>;

// Teste 1 — dados válidos (como viriam do POST)
console.log("\n=== VALIDO ===");
const valido = funcionarioSchema.safeParse({
    nome: "Hugo",
    sobrenome: "Stelzeneder",
    email: "hugo@empresa.com",
    cpf: "111.222.333-44",
    dataNascimento: "2000-01-01",   // ← string, coerce converte
    cargo: "Dev",
    departamento: "ENGENHARIA",
    salario: 5000,
    dataAdmissao: "2026-01-01"
});
console.log("success:", valido.success);
if (valido.success) {
    console.log("data.dataNascimento é Date?", valido.data.dataNascimento instanceof Date);
}

// Teste 2 — vários erros de uma vez
console.log("\n=== MULTIPLOS ERROS ===");
const invalido = funcionarioSchema.safeParse({
    nome: "",
    sobrenome: "Silva",
    email: "nao-eh-email",
    cpf: "123",
    dataNascimento: "2015-01-01",   // menor de 18
    cargo: "",
    departamento: "INVALIDO",
    salario: -100,
    dataAdmissao: "2026-01-01"
});
console.log("success:", invalido.success);
if (!invalido.success) {
    console.log(`Total de erros: ${invalido.error.issues.length}`);
    invalido.error.issues.forEach((issue) => {
        console.log(`- ${issue.path.join(".")}: ${issue.message}`);
    });
}
