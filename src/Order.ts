export class Order {
    products : Array<Product>;

    constructor(produtcs: Array<Product>) {
        this.products = produtcs;
    }

    getOrderDetails() {
        return {
            products : this.products
        }
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