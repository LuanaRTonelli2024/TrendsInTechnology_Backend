const express = require("express");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());

//apenas para testes, geralmente nao fica aqui
app.get("/", (req, res) => {
    console.log(req);
    return res.json({
        message: "API endpoint is working!"
    });
});

//apenas para testes, geralmente nao fica aqui
app.post("/test", (req, res) => {
    console.log(req);
    return res.json({
        message: "API endpoint /test is working!",
        data: {
            ok: true,
            tip: "Data json test endpoint!"
        }
    });
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

module.exports = app;