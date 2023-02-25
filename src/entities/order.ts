import Item from "./item";
import Product from "./product";
import Cpf from "./cpf";

export default class Order {
    items: Array<Item> = [];
    discountCoupon?: number;
    cpf : Cpf;

    constructor(cpf : string, readonly uuid? : string) {
        this.cpf = new Cpf(cpf);
    }

    getOrderDetails() {
        return {
            products: this.items
        }
    }

    addItems(products: Product[]) {
        products.forEach(product => {
            this.items.push(new Item(product.id, product.price, product.quantity));
        });
    }

    addItem(product: Product, quantity : number) {
        if(quantity < 1) throw new Error("invalid quantity");
        this.items.push(new Item(product.id, product.price, quantity));
    }

    getTotal(): number {
        let total: number = 0;

        this.items.forEach(product => {
            total += product.unitPrice * product.quantity;
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
