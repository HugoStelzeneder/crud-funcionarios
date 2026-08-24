import { prisma } from "./db/prisma";

async function main() {
    //  Filtro simples
    console.log("\n=== ENGENHARIA ATIVOS ===");
    const engativos = await prisma.funcionario.findMany({
        where: {
            departamento: "ENGENHARIA",
            status: "ATIVO"
        }
    });
    console.log(`Total: ${engativos.length}`);

    //  Contains (busca por texto)
    console.log("\n=== NOME COM 'a' ===");
    const comA = await prisma.funcionario.findMany({
        where: {
            nome: { contains: "a", mode: "insensitive" }
        }
    });
    console.log(`Total: ${comA.length}`);

    //  Salário entre 3000 e 8000
    console.log("\n=== SALARIO 3000-8000 ===");
    const faixaSalario = await prisma.funcionario.findMany({
        where: {
            salario: { gte: 3000, lte: 8000 }
        }
    });
    console.log(`Total: ${faixaSalario.length}`);

    //  OR
    console.log("\n=== DESIGN OU RH ===");
    const designOrRh = await prisma.funcionario.findMany({
        where: {
            OR: [
                { departamento: "DESIGN" },
                { departamento: "RH" }
            ]
        }
    });
    console.log(`Total: ${designOrRh.length}`);

    //  Ordenação
    console.log("\n=== ORDENADO POR SALARIO DESC ===");
    const ordenados = await prisma.funcionario.findMany({
        orderBy: { salario: "desc" },
        take: 5  // top 5
    });
    ordenados.forEach(f => {
        console.log(`${f.nome} - R$ ${f.salario}`);
    });

    //  Paginação
    console.log("\n=== PAGINA 1 (5 por pagina) ===");
    const pagina = 1;
    const porPagina = 5;
    const [dados, total] = await Promise.all([
        prisma.funcionario.findMany({
            skip: (pagina - 1) * porPagina,
            take: porPagina
        }),
        prisma.funcionario.count()
    ]);
    console.log(`Página ${pagina}/${Math.ceil(total / porPagina)}, total: ${total}`);
    console.log(`Trazendo ${dados.length} registros`);

    //  Select (só nome e email)
    console.log("\n=== SELECT NOME E EMAIL ===");
    const resumo = await prisma.funcionario.findMany({
        select: {
            id: true,
            nome: true,
            email: true
        }
    });
    console.log(resumo);
}

main()
    .catch((erro) => console.error("Erro:", erro))
    .finally(async () => await prisma.$disconnect());
