import axios from "axios";
import expect from "expect";

test('Should not create a order with invalid CPF', async () => {
    const input = {
        cpf: '123.456.789-00'
    }
    const response = await axios.post('http://localhost:3000/checkout', input);
    const output = response.data;
    expect(output.message).toBe('Invalid CPF');
});

test("Should create an order with 3 products", async () => {
    const input = {
        cpf: '123.456.789-09',
        products: [
            { idProduct: 1, quantity: 1 },
            { idProduct: 2, quantity: 1 },
            { idProduct: 3, quantity: 3 }
        ]
    }
    const response = await axios.post('http://localhost:3000/checkout', input);
    const output = response.data;
    expect(output.total).toBe(12);
});

test("Should create an order with 3 products and add discount coupon", async () => {
    const input = {
        cpf: '123.456.789-09',
        products: [
            { idProduct: 1, quantity: 1 },
            { idProduct: 2, quantity: 1 },
            { idProduct: 3, quantity: 3 }
        ],
        coupon: '20PERCENTOFF'
    }
    const response = await axios.post('http://localhost:3000/checkout', input);
    const output = response.data;
    expect(output.total).toBe(9.6);
});
