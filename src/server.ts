import "dotenv/config";
import express from "express";

const app = express();
app.get("/", (req, res) => {
    res.send("Hello World! Servidor Express rodando.");
});

const PORT = process.env.PORT ?? "3000";

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
