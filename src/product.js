export const products = {
    1: {
        name: 'p1',
        description: 'p1',
        price: 1,
        stock: 1,
        width: 1,
        length: 1,
        height: 1,
        weight: 0.1
    },
    2: {
        name: 'p2',
        description: 'p2',
        price: 2,
        stock: 2,
        width: 2,
        length: 2,
        height: 2,
        weight: 2
    },
    3: {
        name: 'p3',
        description: 'p3',
        price: 3,
        stock: 3,
        width: 3,
        length: 3,
        height: 3,
        weight: 3
    },
}

export function createProduct(product, idProduct) {
    if (products.hasOwnProperty(idProduct)) {
        throw new Error("This product already exists");
    }
    if (!product.hasOwnProperty('name') || typeof product.name !== 'string' || product.name === '') {
        throw new Error("Invalid name");
    }
    if (!product.hasOwnProperty('description') || typeof product.description !== 'string' || product.description === '') {
        throw new Error("Invalid description");
    }
    if (!product.hasOwnProperty('price') || typeof product.price !== 'number' || product.price < 0) {
        throw new Error("Invalid price");
    }
    if (!product.hasOwnProperty('stock') || typeof product.stock !== 'number' || product.stock < 0) {
        throw new Error("Invalid stock");
    }
    if (!product.hasOwnProperty('width') || typeof product.width !== 'number' || product.width <= 0) {
        throw new Error("Invalid width");
    }
    if (!product.hasOwnProperty('length') || typeof product.length !== 'number' || product.length <= 0) {
        throw new Error("Invalid length");
    }
    if (!product.hasOwnProperty('height') || typeof product.height !== 'number' || product.height <= 0) {
        throw new Error("Invalid height");
    }
    if (!product.hasOwnProperty('weight') || typeof product.weight !== 'number' || product.weight <= 0) {
        throw new Error("Invalid weight");
    }
    products[idProduct] = product;
}
