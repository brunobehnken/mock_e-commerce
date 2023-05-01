import express from "express";
import validateCpf from "./validateCpf.js";
import Order from "./order.js";

const app = express();
app.listen(3000);
app.use(express.json());

app.post('/checkout', async (req, res) => {
    if (!validateCpf(req.body.cpf)) {
        return res.json({ message: "Invalid CPF" });
    }
    const order = new Order();
    const productsToAdd = req.body.products;
    for (const product of productsToAdd) {
        order.addProduct(product.idProduct, product.quantity);
    }
    if (req.body.coupon) {
        order.addCoupon(req.body.coupon);
    }
    return res.json({ total: order.totalPrice });
});
