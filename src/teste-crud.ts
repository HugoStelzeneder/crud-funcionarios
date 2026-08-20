import { prisma } from "./db/prisma";

async function main() {
    // 1. LISTAR todos
    console.log("\n=== LISTAR TODOS ===");
    const todos = await prisma.funcionario.findMany();
    console.log(`Total: ${todos.length}`);

    // 2. CRIAR novo
    console.log("\n=== CRIAR NOVO ===");
    const novo = await prisma.funcionario.create({
        data: {
            nome: "Ana",
            sobrenome: "Silva",
            email: `ana${Date.now()}@empresa.com`,  // email único
            cpf: `${Date.now()}`.slice(0, 11),        // cpf único
            dataNascimento: new Date("1995-06-15"),
            cargo: "Designer",
            departamento: "DESIGN",
            salario: 5000,
            dataAdmissao: new Date()
        }
    });
    console.log("Criada:", novo);

    // 3. BUSCAR por id
    console.log("\n=== BUSCAR POR ID ===");
    const encontrado = await prisma.funcionario.findUnique({
        where: { id: novo.id }
    });
    console.log("Encontrado:", encontrado);

    // 4. ATUALIZAR
    console.log("\n=== ATUALIZAR ===");
    const atualizado = await prisma.funcionario.update({
        where: { id: novo.id },
        data: {
            salario: 6000,
            cargo: "Designer Senior"
        }
    });
    console.log("Atualizado:", atualizado);

    // 5. FILTRAR por departamento
    console.log("\n=== FILTRAR DESIGN ===");
    const designers = await prisma.funcionario.findMany({
        where: { departamento: "DESIGN" }
    });
    console.log(`Designers: ${designers.length}`);

    // 6. CONTAR
    console.log("\n=== CONTAR ===");
    const total = await prisma.funcionario.count();
    const ativos = await prisma.funcionario.count({
        where: { status: "ATIVO" }
    });
    console.log(`Total: ${total}, Ativos: ${ativos}`);

    // 7. DELETAR
    console.log("\n=== DELETAR ===");
    await prisma.funcionario.delete({
        where: { id: novo.id }
    });
    console.log("Deletado.");
}

main()
    .catch((erro) => {
        console.error("Erro:", erro);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
