-- CreateEnum
CREATE TYPE "Departamento" AS ENUM ('ENGENHARIA', 'PRODUTO', 'DESIGN', 'MARKETING', 'VENDAS', 'RH', 'FINANCEIRO', 'OPERACOES');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ATIVO', 'INATIVO', 'FERIAS', 'AFASTADO');

-- CreateTable
CREATE TABLE "Funcionario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "telefone" TEXT,
    "cargo" TEXT NOT NULL,
    "departamento" "Departamento" NOT NULL,
    "salario" DECIMAL(65,30) NOT NULL,
    "dataAdmissao" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ATIVO',
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Funcionario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Funcionario_email_key" ON "Funcionario"("email");
CREATE UNIQUE INDEX "Funcionario_cpf_key" ON "Funcionario"("cpf");
