import {
    criarFuncionario,
    listarFuncionarios,
    buscarPorId,
    filtrarPorDepartamento,
    demitir,
    atualizarFuncionario
} from "./services/funcionarioService";

import { Departamento } from "./types/funcionario";

async function main() {
    console.log("=== INÍCIO ===\n");

    // 1. Criar 2 funcionários
    const hugo = await criarFuncionario({
        nome: "Hugo",
        sobrenome: "Stelzeneder",
        email: "hugo@empresa.com",
        cpf: "111.222.333-44",
        dataNascimento: new Date("2000-01-01"),
        cargo: "Dev Junior",
        departamento: Departamento.ENGENHARIA,
        salario: 3500,
        dataAdmissao: new Date()
    });
    console.log("Criado:", hugo);

    const ana = await criarFuncionario({
        nome: "Ana",
        sobrenome: "Silva",
        email: "ana@empresa.com",
        cpf: "555.666.777-88",
        dataNascimento: new Date("1995-06-15"),
        cargo: "Designer",
        departamento: Departamento.DESIGN,
        salario: 5000,
        dataAdmissao: new Date()
    });
    console.log("Criada:", ana);

    // 2. Listar
    console.log("\n=== LISTAR ===");
    console.log(await listarFuncionarios());

    // 3. Buscar por id
    console.log("\n=== BUSCAR HUGO ===");
    console.log(await buscarPorId(hugo.id));

    // 4. Filtrar por departamento
    console.log("\n=== FILTRAR ENGENHARIA ===");
    console.log(await filtrarPorDepartamento(Departamento.ENGENHARIA));

    // 5. Atualizar Hugo
    console.log("\n=== ATUALIZAR HUGO ===");
    const hugoAtualizado = await atualizarFuncionario(hugo.id, {
        salario: 4500,
        cargo: "Dev Pleno"
    });
    console.log(hugoAtualizado);

    // 6. Demitir Ana
    console.log("\n=== DEMITIR ANA ===");
    console.log(await demitir(ana.id));

    // 7. Listar final
    console.log("\n=== LISTAR FINAL ===");
    console.log(await listarFuncionarios());

    console.log("\n=== FIM ===");
}

main().catch(erro => {
    console.error("Erro no main:", erro);
});