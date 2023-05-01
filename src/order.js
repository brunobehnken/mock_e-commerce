import validateCpf from "./validateCpf.js";
import {coupons} from "./coupons.js";
import {products} from "./product.js";

const CM3_TO_M3 = 1_000_000;
const MIN_FREIGHT = 10;

export default class Order {
    constructor() {
        this.cpf = undefined
        this.products = {}
        this.subTotalPrice = 0
        this.totalPrice = 0
        this.coupon = undefined
        this.couponMultiplier = 1
        this.freight = 0
    }

    setCpf(cpf) {
        if (validateCpf(cpf)) {
            this.cpf = cpf
        } else {
            throw new Error('Invalid CPF')
        }
    }

    addProduct(idProduct, quantity) {
        if (quantity < 1) { throw new Error('Invalid product quantity') }
        if (this.products.hasOwnProperty(idProduct)) { throw new Error("Product added twice") }
        this.products[idProduct] = quantity
        this.#calculateOrderPrice(products[idProduct].price, quantity);
        this.#calculateFreight(products[idProduct], quantity);
    }

    addCoupon(coupon) {
        if (!(coupon in coupons)) { throw new Error('Invalid discount coupon') }
        if (Date.now() > coupons[coupon].expireDate) { throw new Error('Expired Coupon') }
        this.coupon = coupon
        const discountPercentage = coupons[coupon].discountPercentage
        this.couponMultiplier = (100 - discountPercentage) / 100
        this.totalPrice = Math.floor((this.subTotalPrice * this.couponMultiplier * 100)) / 100;
    }

    #calculateOrderPrice(price, quantity) {
        this.subTotalPrice += price * quantity
        this.totalPrice = Math.floor(this.subTotalPrice * this.couponMultiplier * 100) / 100;
    }

    #calculateFreight(product, quantity) {
        if (this.freight > MIN_FREIGHT) {
            this.freight += this.#calculateProductFreight(product) * quantity;
            return;
        }
        let totalFreight = 0;
        for (const idProduct of Object.keys(this.products)) {
            totalFreight += this.#calculateProductFreight(products[idProduct]) * this.products[idProduct]
        }
        this.freight = (totalFreight > MIN_FREIGHT) ? totalFreight : MIN_FREIGHT;
    }

    #calculateProductFreight(product) {
        const distance = 1000;
        const volume = (product.width * product.length * product.height) / CM3_TO_M3
        const density = product.weight / volume;
        const freight =  distance * volume * (density / 100);
        return Math.floor(freight * 100) / 100;
    }
}
