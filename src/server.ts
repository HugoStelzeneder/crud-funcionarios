import "dotenv/config";
import express from "express";
import { router as funcionariosRouter } from "./routes/funcionarios";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

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

app.use("/funcionarios", funcionariosRouter);

const PORT = process.env.PORT ?? "3000";

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
