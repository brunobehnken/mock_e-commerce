import Product from '../src/product'

test('Create new product', () => {
    const id = 1
    const name = "test name"
    const description = "test description"
    const price = 1.50
    const stock = 5

    const product = new Product(id, name, description, price, stock)

    expect(typeof product).toBe('object')
    expect(product.id).toBe(id)
    expect(product.name).toBe(name)
    expect(product.description).toBe(description)
    expect(product.price).toBe(price)
    expect(product.stock).toBe(stock)
});
