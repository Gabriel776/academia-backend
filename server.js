const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Rota de exemplo
app.get("/", (req, res) => {
  res.send({ message: "Backend da academia funcionando!" });
});

// Porta do servidor (Render usa process.env.PORT)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
