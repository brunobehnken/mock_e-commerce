import {validateCpf} from "./validateCpf";
import {coupons} from "./coupons";
import {products} from "./product.js";

export default class Order {
    constructor() {
        this.cpf = undefined
        this.products = {}
        this.subTotalPrice = 0
        this.totalPrice = 0
        this.coupon = undefined
        this.couponMultiplier = 1
    }

    setCpf(cpf) {
        if (validateCpf(cpf)) {
            this.cpf = cpf
        } else {
            throw new Error('Invalid CPF')
        }
    }

    addProduct(idProduct, quantity) {
        this.products[idProduct] = quantity
        const productPrice = products[idProduct].price * quantity
        this.subTotalPrice += productPrice
        this.totalPrice = this.subTotalPrice * this.couponMultiplier
    }

    addCoupon(coupon) {
        if (!(coupon in coupons)) {
            throw new Error('Invalid discount coupon')
        }
        this.coupon = coupon
        const discountPercentage = coupons[coupon]
        this.couponMultiplier = (100 - discountPercentage) / 100
        this.totalPrice = this.subTotalPrice * this.couponMultiplier
    }
}
