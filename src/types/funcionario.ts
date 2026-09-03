import type { Funcionario } from "@prisma/client";
export type { Funcionario };
export { Departamento, Status } from "@prisma/client";

// Types derivados // Removidos pois agora usamos os tipos gerados automaticamente pelos schemas Zod
// export type CriarFuncionarioInput = Omit<Funcionario, "id" | "status" | "criadoEm" | "atualizadoEm">;
// export type AtualizarFuncionarioInput = Partial<Omit<Funcionario, "id" | "cpf" | "criadoEm" | "atualizadoEm">>;
