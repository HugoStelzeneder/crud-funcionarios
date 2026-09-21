# CRUD de Funcionários — Sistema de RH

API REST para gerenciamento de funcionários de uma empresa. Permite cadastrar, listar, buscar, atualizar e demitir (soft delete) funcionários.

Projeto desenvolvido como parte do treinamento para o desafio técnico de RH.

## 🚀 Tech Stack

- **Linguagem:** TypeScript
- **Runtime:** Node.js 22
- **Framework HTTP:** Express 5
- **Banco de dados:** PostgreSQL 16
- **ORM:** Prisma 7
- **Validação:** Zod 4
- **Containerização:** Docker + Docker Compose

## 📦 Como rodar

### Pré-requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e rodando
- Git
- Node.js 22+ (opcional — só se quiser rodar fora do Docker)

### Passo a passo

```bash
# 1. Clonar o repositório
git clone https://github.com/HugoStelzeneder/crud-funcionarios.git
cd crud-funcionarios

# 2. Copiar variáveis de ambiente
cp .env.example .env

# 3. Subir tudo (API + banco)
docker compose up
```

A API vai estar disponível em `http://localhost:3000`.

### Rodar migrations (primeira vez apenas)

Em outro terminal, com o Compose já rodando:

```bash
docker compose exec api npx prisma migrate deploy
```

### Parar tudo

```bash
docker compose down          # Para os containers (mantém dados do banco)
docker compose down -v       # Para e apaga volumes (RESET total do banco)
```

## 📚 Endpoints

| Método | Rota | Descrição |
|:------:|:-----|:----------|
| `POST` | `/funcionarios` | Cria funcionário |
| `GET` | `/funcionarios` | Lista todos os funcionários |
| `GET` | `/funcionarios/:id` | Busca funcionário por ID |
| `PUT` | `/funcionarios/:id` | Atualiza funcionário |
| `DELETE` | `/funcionarios/:id` | Demite funcionário (soft delete — muda status pra INATIVO) |

## 🧪 Exemplos de uso

### Criar funcionário

```bash
curl -X POST http://localhost:3000/funcionarios \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Hugo",
    "sobrenome": "Stelzeneder",
    "email": "hugo@empresa.com",
    "cpf": "111.222.333-44",
    "dataNascimento": "2000-01-01",
    "cargo": "Dev Junior",
    "departamento": "ENGENHARIA",
    "salario": 3500,
    "dataAdmissao": "2026-01-01"
  }'
```

### Listar todos

```bash
curl http://localhost:3000/funcionarios
```

### Buscar por ID

```bash
curl http://localhost:3000/funcionarios/<id-do-funcionario>
```

### Atualizar (aumento de salário e mudança de cargo)

```bash
curl -X PUT http://localhost:3000/funcionarios/<id-do-funcionario> \
  -H "Content-Type: application/json" \
  -d '{
    "salario": 4500,
    "cargo": "Dev Pleno"
  }'
```

### Demitir

```bash
curl -X DELETE http://localhost:3000/funcionarios/<id-do-funcionario>
```

> **Observação:** o campo `salario` retorna como **string** no JSON (ex: `"3500"`). Isso é comportamento padrão do Prisma com o tipo `Decimal` para preservar precisão financeira.

## 🗂️ Estrutura de pastas

```
crud-funcionarios/
├── prisma/
│   ├── schema.prisma        ← modelo de dados (Funcionario)
│   └── migrations/          ← histórico de mudanças no banco
├── src/
│   ├── controllers/         ← recebe req/res, chama service
│   ├── db/                  ← Prisma Client singleton
│   ├── middlewares/         ← validação Zod, validação de ID
│   ├── routes/              ← define endpoints da API
│   ├── schemas/             ← schemas Zod (criar, atualizar)
│   ├── services/            ← regras de negócio, chama Prisma
│   ├── types/               ← re-exports de tipos Prisma
│   └── server.ts            ← ponto de entrada, sobe Express
├── .dockerignore
├── .env.example
├── docker-compose.yml
├── Dockerfile
├── package.json
└── tsconfig.json
```

## 🏗️ Arquitetura

Fluxo de uma request HTTP:

```
Cliente → Routes → Middleware (Zod) → Controller → Service → Prisma → PostgreSQL
```

Cada camada tem **uma responsabilidade única**:
- **Routes:** define endpoints e conecta middlewares/controllers
- **Middlewares:** valida dados de entrada (Zod)
- **Controllers:** trata request/response HTTP, chama service
- **Services:** regras de negócio, chama Prisma
- **Prisma:** conversa com o banco

## 📋 Validações principais

- **Nome/Sobrenome:** letras, espaços e acentos (regex)
- **Email:** formato válido + lowercase
- **CPF:** 11 dígitos (com ou sem formatação)
- **Idade:** ≥ 18 anos (via `dataNascimento`)
- **Data de admissão:** não pode ser futura
- **Salário:** ≥ salário mínimo
- **Departamento:** enum (ENGENHARIA, DESIGN, RH, VENDAS, etc.)

## 🛑 Status codes retornados

| Código | Situação |
|:------:|:---------|
| `200` | GET, PUT, DELETE OK |
| `201` | POST criou com sucesso |
| `204` | Sem conteúdo (raro aqui) |
| `400` | Dados inválidos (falha do Zod) |
| `404` | Funcionário não encontrado |
| `409` | Conflito — email/CPF duplicado |
| `500` | Erro interno do servidor |

## 🛠️ Comandos úteis

```bash
# Ver logs em tempo real
docker compose logs -f

# Ver logs só da API
docker compose logs -f api

# Abrir Prisma Studio (interface visual do banco)
docker compose exec api npx prisma studio

# Executar um comando qualquer dentro do container da API
docker compose exec api <comando>

# Rebuildar tudo forçadamente (após mudar Dockerfile)
docker compose up --build
```
