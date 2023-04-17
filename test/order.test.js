import Order from "../src/order";
import Product from "../src/product";

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

test('Create an order with 3 products and assert total value', () => {
    const product1 = new Product(1, "p1", "p1", 1, 1);
    const product1Quantity = 1;
    const product2 = new Product(2, "p2", "p2", 2, 2);
    const product2Quantity = 1;
    const product3 = new Product(3, "p3", "p3", 3, 3);
    const product3Quantity = 3;
    const totalPrice = product1.price * product1Quantity + product2.price * product2Quantity + product3.price * product3Quantity

    const order = new Order();
    order.addProduct(product1, product1Quantity);
    order.addProduct(product2, product2Quantity);
    order.addProduct(product3, product3Quantity);

    expect(order.totalPrice).toBe(totalPrice);
});

test('Create an order with 3 products, associate discount coupon and assert total value', () => {
    const product1 = new Product(1, "p1", "p1", 1, 1);
    const product1Quantity = 1;
    const product2 = new Product(2, "p2", "p2", 2, 2);
    const product2Quantity = 1;
    const product3 = new Product(3, "p3", "p3", 3, 3);
    const product3Quantity = 3;
    const coupon20PercentOff = "20PERCENTOFF";
    const totalPrice = (product1.price * product1Quantity + product2.price * product2Quantity + product3.price * product3Quantity) * 0.8

    const order = new Order();
    order.addProduct(product1, product1Quantity);
    order.addProduct(product2, product2Quantity);
    order.addProduct(product3, product3Quantity);
    order.addCoupon(coupon20PercentOff)

    expect(order.coupon).toBe(coupon20PercentOff);
    expect(order.totalPrice).toBe(totalPrice);
});

test('Do not create an order with invalid CPF', () => {
    const cpf = '123.456.789-00'

    const order = new Order()
    expect(() => {order.setCpf(cpf)}).toThrow(new Error('Invalid CPF'))
});
