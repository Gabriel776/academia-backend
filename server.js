const express = require("express");
const cors = require("cors");
const mercadopago = require("mercadopago");

const app = express();
app.use(cors());
app.use(express.json());

// Configurar Mercado Pago
mercadopago.configure({
    access_token: "APP_USR-dada39f4-c765-4277-bd9c-f1d66ac0727b"
});

// Criar pagamento PIX + Cartão
app.post("/create-payment", async (req, res) => {
    try {
        const payment = await mercadopago.preferences.create({
            items: [
                {
                    title: "Pagamento Academia",
                    quantity: 1,
                    unit_price: 10
                }
            ],
            back_urls: {
                success: "https://seusite.com/sucesso",
                failure: "https://seusite.com/erro"
            },
            auto_return: "approved"
        });

        res.send({ id: payment.body.id, init_point: payment.body.init_point });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Erro ao gerar pagamento" });
    }
});

// Webhook (confirmação automática)
app.post("/webhook", async (req, res) => {
    console.log("Webhook recebido:", req.body);
    res.sendStatus(200);
});

// Rota inicial
app.get("/", (req, res) => {
    res.send({ message: "Backend com Mercado Pago funcionando!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor rodando na porta " + PORT);
});
