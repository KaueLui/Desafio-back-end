const express = require("express");
const cors = require("cors");
const db = require("./models");
const taskRoutes = require("./routes/taskRoutes");
const tagRoutes = require("./routes/tagRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());


app.use("/tasks", taskRoutes);
app.use("/tags", tagRoutes);
app.use("/auth", authRoutes);

// Rota que vai verificar se está rodando
app.get("/", (req, res) => {
    res.send("API funcionando!");
});

// Aqui ele vai iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    try {
        await db.sequelize.sync();
        console.log("Banco de dados sincronizado!");
    } catch (error) {
        console.error("Erro ao sincronizar o banco:", error);
    }
});
