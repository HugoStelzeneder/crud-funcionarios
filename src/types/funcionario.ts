import type { Funcionario } from "@prisma/client";
export type { Funcionario };
export { Departamento, Status } from "@prisma/client";

// Types derivados 
export type CriarFuncionarioInput = Omit<Funcionario, "id" | "status" | "criadoEm" | "atualizadoEm">;
export type AtualizarFuncionarioInput = Partial<Omit<Funcionario, "id" | "cpf" | "criadoEm" | "atualizadoEm">>;
