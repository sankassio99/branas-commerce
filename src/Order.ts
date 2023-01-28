export class Order {
    products : Array<Product>;
    discountCoupon? : number ;

    constructor(produtcs: Array<Product>) {
        this.products = produtcs;
    }

    getOrderDetails() {
        return {
            products : this.products
        }
    }

    getTotal() : number {
        let total : number = 0;

        this.products.forEach(product => {
            total += product.price * product.quantity;
        });

        if(this.discountCoupon){
            var discountValue = total * (this.discountCoupon / 100)
            total = total - discountValue;
        }

        return total;
    }

    addDiscountCoupon(discountCoupon: number) {
        this.discountCoupon = discountCoupon;
    }

}

export class Product {
    desc: String;
    price: number;
    quantity: number;

    constructor(desc: String, price: number, quantity: number) {
        this.desc = desc;
        this.price = price;
        this.quantity = quantity;
    }
}