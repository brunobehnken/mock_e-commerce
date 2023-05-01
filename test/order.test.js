import expect from "expect";
import Order from "../src/order";
import {products} from "../src/product";

test('Create new order', () => {
    const order = new Order()
    expect(typeof order).toBe('object')
});

test('Create an order and assign a valid CPF', () => {
    const cpf = '123.456.789-09'

    const order = new Order()
    order.setCpf(cpf)

    expect(order.cpf).toBe(cpf)
});

test('Do not create an order with invalid CPF', () => {
    const cpf = '123.456.789-00'

    const order = new Order()
    expect(() => {order.setCpf(cpf)}).toThrow(new Error('Invalid CPF'))
});

test('Create an order with 3 products and assert total value', () => {
    let totalPrice = 0;
    const productsToAdd = {
        1: 1,
        2: 1,
        3: 3
    }
    for (const idProduct in productsToAdd) {
        totalPrice += products[idProduct].price * productsToAdd[idProduct];
    }

    const order = new Order();
    for (const idProduct in productsToAdd) {
        order.addProduct(idProduct, productsToAdd[idProduct])
    }

    expect(order.totalPrice).toBe(totalPrice);
});

test('Create an order with 3 products, associate discount coupon and assert total value', () => {
    let totalPrice = 0;
    const productsToAdd = {
        1: 1,
        2: 1,
        3: 3
    }
    for (const idProduct in productsToAdd) {
        totalPrice += products[idProduct].price * productsToAdd[idProduct];
    }
    const coupon20PercentOff = "20PERCENTOFF";
    totalPrice *= 0.8

    const order = new Order();
    for (const idProduct in productsToAdd) {
        order.addProduct(idProduct, productsToAdd[idProduct])
    }
    order.addCoupon(coupon20PercentOff)

    expect(order.coupon).toBe(coupon20PercentOff);
    expect(order.totalPrice).toBe(totalPrice);
});
