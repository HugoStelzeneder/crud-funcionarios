import "dotenv/config";
import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World! Servidor Express rodando.");
});

app.get("/sobre", (req, res) => {
    res.send("Sistema de RH - API v1.0");
});

app.get("/funcionarios/:id", (req, res) => {
    const id = req.params.id;
    res.send(`Você pediu o funcionário com ID: ${id}`);
});

const PORT = process.env.PORT ?? "3000";

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
