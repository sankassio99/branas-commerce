import Product from "./product";

export default class Order {
    products: Array<Product>;
    discountCoupon?: number;

    constructor(produtcs: Array<Product>) {
        this.products = produtcs;
    }

    getOrderDetails() {
        return {
            products: this.products
        }
    }

    getTotal(): number {
        let total: number = 0;

        this.products.forEach(product => {
            total += product.price * product.quantity;
        });

        if (this.discountCoupon) {
            var discountValue = total * (this.discountCoupon / 100)
            total = total - discountValue;
        }

        return total;
    }

    addDiscountCoupon(discountCoupon: number) {
        this.discountCoupon = discountCoupon;
    }

}
