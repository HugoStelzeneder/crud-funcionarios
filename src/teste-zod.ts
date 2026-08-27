import { z } from 'zod';

// Schema para nome
const nomeSchema = z.string()
    .min(1, "Nome não pode ser vazio")
    .max(100, "Nome muito longo");

// Testa
console.log("\n=== Teste de validação de nome ===");
console.log(nomeSchema.safeParse("João"));
// {success: true, data: 'João'}

console.log(nomeSchema.safeParse(""));
// {success: false, error: ZodError com "Nome não pode ser vazio"}

console.log(nomeSchema.safeParse(42));
// {success: false, error: ZodError com "Expected string, received number"}

//Schema para salário
const salarioSchema = z.number()
    .positive("Salário deve ser positivo")
    .max(1000000, "Salário muito alto");

console.log("\n=== Teste de validação de salário ===");
console.log(salarioSchema.safeParse(5000));
// {success: true, data: 5000}

console.log(salarioSchema.safeParse(-1000));
// {success: false, error: ZodError com "Salário deve ser positivo"}

console.log(salarioSchema.safeParse("cinco mil"));
// {success: false, error: ZodError com "Expected number, received string"}

// Schema para email
const emailSchema = z.string()
    .email("Email inválido");

console.log("\n=== Teste de validação de email ===");
console.log(emailSchema.safeParse("joao@examplo.com"));
console.log(emailSchema.safeParse("nao-eh-email"));
