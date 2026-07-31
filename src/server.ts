import "dotenv/config";
import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.status(200).json({
        mensagem: "Servidor Express rodando.",
        versao: "1.0"
    });
});

app.get("/sobre", (req, res) => {
    res.status(200).json({
        nome: "Sistema de RH",
        versao: "1.0",
        descricao: "API para gerenciamento de funcionários"
    });
});

app.get("/funcionarios/:id", (req, res) => {
    const id = req.params.id;

    if (id === "0") {
        res.status(404).json({
            erro: "Funcionário não encontrado",
            idBuscado: id
        });
        return;
    }

    res.status(200).json({
        id: id,
        nome: "Funcionário Exemplo",
        mensagem: `Funcionário ${id} encontrado`
    });
});

const PORT = process.env.PORT ?? "3000";

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
