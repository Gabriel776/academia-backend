const express = require("express");
const cors = require("cors");
const mercadopago = require("mercadopago");

const app = express();
app.use(cors());
app.use(express.json());

// CONFIGURAÇÃO DO MERCADO PAGO
mercadopago.configure({
    access_token: "APP_USR-dada39f4-c765-4277-bd9c-f1d66ac0727b"
});

// TESTE PARA VER SE A API ESTÁ ONLINE
app.get("/", (req, res) => {
    res.send("API funcionando!");
});

// ROTA DE PAGAMENTO
app.post("/pagar", async (req, res) => {
    try {
        const { title, price } = req.body;

        const preference = {
            items: [
                {
                    title: title,
                    quantity: 1,
                    currency_id: "BRL",
                    unit_price: Number(price)
                }
            ]
        };

        const response = await mercadopago.preferences.create(preference);
        return res.json({
            id: response.body.id,
            init_point: response.body.init_point
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erro ao criar pagamento" });
    }
});

// PORTA PARA O RENDER
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Servidor rodando na porta " + port);
});
