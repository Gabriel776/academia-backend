const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Rota de exemplo
app.get("/", (req, res) => {
  res.send({ message: "Backend da academia funcionando!" });
});

// Substitua essa porta depois no Render, não mexa aqui
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
