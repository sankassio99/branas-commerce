export class Order {
    constructor(produtcs: Array<Product>) {
    }
    
    getOrder() {
        return {
            products : []
        }
    }

    createOrder(products: Product[]) {
        throw new Error("Method not implemented.");
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