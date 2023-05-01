import {products, createProduct} from "../src/product.js";
import expect from "expect";

const idProductToAdd = 10;
let productToAdd = {
    name: 'pTest',
    description: 'pTest',
    price: 10,
    stock: 10,
    width: 10,
    length: 5,
    height: 6,
    weight: 10
};

afterEach(() => {
    delete products[idProductToAdd];
    productToAdd = {
        name: 'pTest',
        description: 'pTest',
        price: 10,
        stock: 10,
        width: 10,
        length: 5,
        height: 6,
        weight: 10
    };
});

test('Should add a product', () => {
    createProduct(productToAdd, idProductToAdd);
    expect(products.hasOwnProperty(idProductToAdd)).toBe(true);
});

test('Should not add a product that already exists', () => {
    expect(() => { createProduct(productToAdd, 1) }).toThrow(new Error('This product already exists'));
});

test('Should not add a product without name', () => {
    delete productToAdd.name;
    expect(() => { createProduct(productToAdd, idProductToAdd) }).toThrow(new Error('Invalid name'));
});

test('Should not add a product with empty name', () => {
    productToAdd.name = '';
    expect(() => { createProduct(productToAdd, idProductToAdd) }).toThrow(new Error('Invalid name'));
});

test('Should not add a product with invalid name', () => {
    productToAdd.name = 100;
    expect(() => { createProduct(productToAdd, idProductToAdd) }).toThrow(new Error('Invalid name'));
});

test('Should not add a product without description', () => {
    delete productToAdd.description;
    expect(() => { createProduct(productToAdd, idProductToAdd) }).toThrow(new Error('Invalid description'));
});

test('Should not add a product with empty description', () => {
    productToAdd.description = '';
    expect(() => { createProduct(productToAdd, idProductToAdd) }).toThrow(new Error('Invalid description'));
});

test('Should not add a product with invalid description', () => {
    productToAdd.description = 100;
    expect(() => { createProduct(productToAdd, idProductToAdd) }).toThrow(new Error('Invalid description'));
});

test('Should not add a product without price', () => {
    delete productToAdd.price;
    expect(() => { createProduct(productToAdd, idProductToAdd) }).toThrow(new Error('Invalid price'));
});

test('Should not add a product with invalid price', () => {
    productToAdd.price = "-5";
    expect(() => { createProduct(productToAdd, idProductToAdd) }).toThrow(new Error('Invalid price'));
});

test('Should not add a product with negative price', () => {
    productToAdd.price = -5;
    expect(() => { createProduct(productToAdd, idProductToAdd) }).toThrow(new Error('Invalid price'));
});

test('Should not add a product without stock', () => {
    delete productToAdd.stock;
    expect(() => { createProduct(productToAdd, idProductToAdd) }).toThrow(new Error('Invalid stock'));
});

test('Should not add a product with invalid stock', () => {
    productToAdd.stock = "-5";
    expect(() => { createProduct(productToAdd, idProductToAdd) }).toThrow(new Error('Invalid stock'));
});

test('Should not add a product with negative stock', () => {
    productToAdd.stock = -5;
    expect(() => { createProduct(productToAdd, idProductToAdd) }).toThrow(new Error('Invalid stock'));
});

test('Should not add a product without width', () => {
    delete productToAdd.width;
    expect(() => { createProduct(productToAdd, idProductToAdd) }).toThrow(new Error('Invalid width'));
});

test('Should not add a product with invalid width', () => {
    productToAdd.width = "-5";
    expect(() => { createProduct(productToAdd, idProductToAdd) }).toThrow(new Error('Invalid width'));
});

test('Should not add a product with negative width', () => {
    productToAdd.width = -5;
    expect(() => { createProduct(productToAdd, idProductToAdd) }).toThrow(new Error('Invalid width'));
});

test('Should not add a product with width = 0', () => {
    productToAdd.width = 0;
    expect(() => { createProduct(productToAdd, idProductToAdd) }).toThrow(new Error('Invalid width'));
});

test('Should not add a product without length', () => {
    delete productToAdd.length;
    expect(() => { createProduct(productToAdd, idProductToAdd) }).toThrow(new Error('Invalid length'));
});

test('Should not add a product with invalid length', () => {
    productToAdd.length = "-5";
    expect(() => { createProduct(productToAdd, idProductToAdd) }).toThrow(new Error('Invalid length'));
});

test('Should not add a product with negative length', () => {
    productToAdd.length = -5;
    expect(() => { createProduct(productToAdd, idProductToAdd) }).toThrow(new Error('Invalid length'));
});

test('Should not add a product with length = 0', () => {
    productToAdd.length = 0;
    expect(() => { createProduct(productToAdd, idProductToAdd) }).toThrow(new Error('Invalid length'));
});

test('Should not add a product without height', () => {
    delete productToAdd.height;
    expect(() => { createProduct(productToAdd, idProductToAdd) }).toThrow(new Error('Invalid height'));
});

test('Should not add a product with invalid height', () => {
    productToAdd.height = "-5";
    expect(() => { createProduct(productToAdd, idProductToAdd) }).toThrow(new Error('Invalid height'));
});

test('Should not add a product with negative height', () => {
    productToAdd.height = -5;
    expect(() => { createProduct(productToAdd, idProductToAdd) }).toThrow(new Error('Invalid height'));
});

test('Should not add a product with height = 0', () => {
    productToAdd.height = 0;
    expect(() => { createProduct(productToAdd, idProductToAdd) }).toThrow(new Error('Invalid height'));
});

test('Should not add a product without weight', () => {
    delete productToAdd.weight;
    expect(() => { createProduct(productToAdd, idProductToAdd) }).toThrow(new Error('Invalid weight'));
});

test('Should not add a product with invalid weight', () => {
    productToAdd.weight = "-10";
    expect(() => { createProduct(productToAdd, idProductToAdd) }).toThrow(new Error('Invalid weight'));
});

test('Should not add a product with negative weight', () => {
    productToAdd.weight = -10;
    expect(() => { createProduct(productToAdd, idProductToAdd) }).toThrow(new Error('Invalid weight'));
});

test('Should not add a product with weight = 0', () => {
    productToAdd.weight = 0;
    expect(() => { createProduct(productToAdd, idProductToAdd) }).toThrow(new Error('Invalid weight'));
});
