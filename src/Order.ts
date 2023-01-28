export class Order {


    constructor(produtcs: Array<Product>) {
    }

    getOrderDetails() {
        return {
            products : []
        }
    }

    createOrder(products: Product[]) {
        
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