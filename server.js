const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

// 🔧 MERCADO PAGO - ACCESS TOKEN CORRETO
const ACCESS_TOKEN = "APP_USR-4179960091459463-112413-2c9a342c22b476dbbbec9d2c4e3f9621";

// ✔ ROTA PARA TESTAR SE A API ESTÁ ONLINE
app.get("/", (req, res) => {
  res.send("API funcionando!");
});

// ✔ ROTA PARA GERAR PIX
app.post("/pagar", async (req, res) => {
  try {
    const { nome, email, valor } = req.body;

    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        payer: {
          email: email,
          first_name: nome
        },
        transaction_amount: Number(valor),
        description: "Pagamento Academia",
        payment_method_id: "pix"
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({
      erro: "Erro ao gerar PIX",
      detalhe: error.message
    });
  }
});

// Porta para o Render
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Servidor rodando na porta " + port);
});
