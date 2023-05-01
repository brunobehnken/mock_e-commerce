import expect from "expect";
import Order from "../src/order";
import {products} from "../src/product";

test('Should create an order', () => {
    const order = new Order()
    expect(typeof order).toBe('object')
});

test('Should create an order and assign a valid CPF', () => {
    const cpf = '123.456.789-09'

    const order = new Order()
    order.setCpf(cpf)

    expect(order.cpf).toBe(cpf)
});

test('Should not create an order with invalid CPF', () => {
    const cpf = '123.456.789-00'

    const order = new Order()
    expect(() => {order.setCpf(cpf)}).toThrow(new Error('Invalid CPF'))
});

test('Should create an order with 3 products and assert total value', () => {
    let totalPrice = 0;
    const productsToAdd = [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
        { idProduct: 3, quantity: 3 }
    ]
    for (const product of productsToAdd) {
        totalPrice += products[product.idProduct].price * product.quantity;
    }

    const order = new Order();
    for (const product of productsToAdd) {
        order.addProduct(product.idProduct, product.quantity)
    }

    expect(order.totalPrice).toBe(totalPrice);
});

test('Should create an order with 3 products, associate discount coupon and assert total value', () => {
    let totalPrice = 0;
    const productsToAdd = [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
        { idProduct: 3, quantity: 3 }
    ]
    for (const product of productsToAdd) {
        totalPrice += products[product.idProduct].price * product.quantity;
    }
    const coupon20PercentOff = "20PERCENTOFF";
    totalPrice *= 0.8
    totalPrice = Math.floor(totalPrice * 100) / 100;

    const order = new Order();
    for (const product of productsToAdd) {
        order.addProduct(product.idProduct, product.quantity)
    }
    order.addCoupon(coupon20PercentOff)

    expect(order.coupon).toBe(coupon20PercentOff);
    expect(order.totalPrice).toBe(totalPrice);
});

test('Should create an order with products, associate discount coupon, add more products and assert total value', () => {
    let totalPrice = 0;
    const productsToAdd = [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
    ]
    const moreProductsToAdd = [
        { idProduct: 3, quantity: 3 }
    ];
    for (const product of productsToAdd) {
        totalPrice += products[product.idProduct].price * product.quantity;
    }
    for (const product of moreProductsToAdd) {
        totalPrice += products[product.idProduct].price * product.quantity;
    }
    const coupon20PercentOff = "20PERCENTOFF";
    totalPrice *= 0.8
    totalPrice = Math.floor(totalPrice * 100) / 100;

    const order = new Order();
    for (const product of productsToAdd) {
        order.addProduct(product.idProduct, product.quantity)
    }
    order.addCoupon(coupon20PercentOff)
    for (const product of moreProductsToAdd) {
        order.addProduct(product.idProduct, product.quantity)
    }

    expect(order.coupon).toBe(coupon20PercentOff);
    expect(order.totalPrice).toBe(totalPrice);
});

test("Should not create an order with an expired coupon", () => {
    const expiredCoupon = "EXPIREDCOUPON";
    const order = new Order();
    expect(() => { order.addCoupon(expiredCoupon) }).toThrow(new Error('Expired Coupon'))
});

test('Should not create an order with negative product quantity', () => {
    const product = { idProduct: 3, quantity: -3 }

    const order = new Order();

    expect(() => { order.addProduct(product.idProduct, product.quantity) }).toThrow(new Error("Invalid product quantity"))
});

test('Should not create an order when a product is added twice', () => {
    const productsToAdd = [
        { idProduct: 1, quantity: 1 },
        { idProduct: 1, quantity: 2 }
    ]

    const order = new Order();
    order.addProduct(productsToAdd[0].idProduct, productsToAdd[0].quantity)

    expect(() => { order.addProduct(productsToAdd[1].idProduct, productsToAdd[1].quantity) }).toThrow(new Error("Product added twice"))
});

test('Should calculate the freight of an order', () => {
    let freight = 0;
    const distance = 1000;
    const productsToAdd = [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
        { idProduct: 3, quantity: 3 }
    ]
    for (const product of productsToAdd) {
        const volume = (products[product.idProduct].width * products[product.idProduct].length * products[product.idProduct].height) / 1_000_000
        const density = products[product.idProduct].weight / volume;
        const productFreight = distance * volume * (density / 100);
        freight += productFreight * product.quantity;
    }

    const order = new Order();
    for (const product of productsToAdd) {
        order.addProduct(product.idProduct, product.quantity)
    }

    expect(order.freight).toBe(freight);
});

test('Should calculate the freight of an order that has a freight price lower than the minimum price', () => {
    let freight = 10;
    const productsToAdd = [
        { idProduct: 1, quantity: 1 }
    ]

    const order = new Order();
    for (const product of productsToAdd) {
        order.addProduct(product.idProduct, product.quantity)
    }

    expect(order.freight).toBe(freight);
});
